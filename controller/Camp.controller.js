const Camp = require("../models/Camp.model.js");
const Donor = require("../models/Donor.model.js");
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
    // console.log("Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const donorCampRegisterHandler = async (req, res) => {
  try {
    const { id, bloodGroup, contact, donorName } = req.body;
    // console.log(req.body)
    const camp = await Camp.findById(id);
    if (!camp) {
      return res.status(400).json({ message: "Camp not found" });
    }
    const donor = await Donor.findById(req.user.id);
    if (!donor) {
      return res.status(400).json({ message: "Donor not found" });
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
module.exports = {
  AddCampHandler,
  searchCampHandler,
  donorCampRegisterHandler,
};
