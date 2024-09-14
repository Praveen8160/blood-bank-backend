const Camp = require("../models/Camp.model.js");
const Donor = require("../models/Donor.model.js");
const mongoose = require("mongoose");
const AddCampHandler = async (req, res) => {
  try {
    const {
      campName,
      state,
      district,
      address,
      campDate,
      startTime,
      endTime,
      description,
    } = req.body;
    const existingCamp = await Camp.findOne({ campName });
    if (existingCamp) {
      return res.status(400).json({ message: "Camp name already exists" });
    }
    const newCamp = new Camp({
      campName,
      state,
      district,
      address,
      date: campDate,
      startTime,
      bloodBankId: req.user.id,
      endTime,
      description,
    });
    await newCamp.save();
    return res.status(201).json({ success: true, message: "Camp Added" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const searchCampHandler = async (req, res) => {
  try {
    const { state, district } = req.body;
    const camps = await Camp.find({ state, district });
    return res.status(200).json({ success: true, data: camps });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const donorCampRegisterHandler = async (req, res) => {
  try {
    const { id, bloodGroup, contact, donorName } = req.body;
    const camp = await Camp.findById(id);
    if (!camp) {
      return res
        .status(400)
        .json({ success: false, message: "Camp not found" });
    }
    // const donor = await Donor.findById(req.user.id);
    // if (!donor) {
    //   return res.status(400).json({ message: "Donor not found" });
    // }
    const donor = camp.donorsRegistered.find(
      (donor) => donor.donorId == req.user.id
    );
    if (donor) {
      console.log("already registerd");
      return res
        .status(400)
        .json({ success: false, message: "Donor already registered" });
    }
    camp.donorsRegistered.push({
      donorId: req.user.id,
      donorName: donorName,
      bloodType: bloodGroup,
      contact: contact,
      status: "Pending",
    });
    await camp.save();
    return res.status(201).json({ success: true, message: "Donor Registered" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getallCamphandler = async (req, res) => {
  try {
    const camps = await Camp.find({ bloodBankId: req.user.id });
    // console.log(camps);
    return res.status(200).json({ success: true, data: camps });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const updateDonorStatus = async (req, res) => {
  try {
    const { campid, donorid, status } = req.body;
    const camp = await Camp.findById(campid);
    if (!camp) {
      return res.status(400).json({ message: "Camp not found" });
    }
    const donor = camp.donorsRegistered.find(
      (donor) => donor.donorId == donorid
    );
    if (!donor) {
      return res.status(400).json({ message: "Donor not found" });
    }
    donor.status = status;
    await camp.save();
    return res
      .status(200)
      .json({ success: true, message: "Donor status updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const donorCampRegisteredHandler = async (req, res) => {
  try {
    const donorId = new mongoose.Types.ObjectId(req.user.id);

    const camps = await Camp.aggregate([
      {
        $match: {
          "donorsRegistered.donorId": donorId,
        },
      },
      {
        $project: {
          campName: 1,
          state: 1,
          district: 1,
          address: 1,
          date: 1,
          startTime: 1,
          endTime: 1,
          description: 1,
          bloodBankId: 1,
          donorsRegistered: {
            $filter: {
              input: "$donorsRegistered",
              as: "donor",
              cond: {
                $eq: ["$$donor.donorId", donorId], // Use ObjectId for comparison
              },
            },
          },
        },
      },
    ]);

    // console.log(camps);
    return res.status(200).json({ success: true, data: camps });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const cancelRegistration = async (req, res) => {
  try {
    const camp = await Camp.findById(req.body.campId);
    if (!camp) {
      return res.status(400).json({ message: "Camp not found" });
    }
    camp.donorsRegistered = camp.donorsRegistered.filter(
      (donor) => donor.donorId != req.user.id
    );
    await camp.save();
    return res.status(200).json({ success: true, message: "Donor cancelled" });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  AddCampHandler,
  searchCampHandler,
  donorCampRegisterHandler,
  getallCamphandler,
  updateDonorStatus,
  donorCampRegisteredHandler,
  cancelRegistration,
};
