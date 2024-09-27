const Donor = require("../models/Donor.model.js");
const BloodBank = require("../models/BloodBank.model.js");
const searchDonorHandler = async (req, res) => {
  const { state, district, bloodGroup } = req.body;
  try {
    const Donors = await Donor.find({
      state: state,
      district: district,
      bloodGroup: bloodGroup,
    });
    // console.log(Donors);
    return res.status(200).json({ success: true, Donors });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getNearestDonor = async (req, res) => {
  const { latitude, longitude, bloodGroup } = req.body;
  // console.log(latitude, longitude);
  try {
    const Donors = await Donor.find({
      bloodGroup,
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: 10000,
        },
      },
    });
    return res.status(200).json({ success: true, Donors });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const searchBloodBankHandler = async (req, res) => {
  const { state, district } = req.body;
  try {
    const bloobank = await BloodBank.find({
      state: state,
      district: district,
    });
    // console.log(Donors);
    return res.status(200).json({ success: true, bloobank });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getNearestBloodBank = async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const bloobank = await BloodBank.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: 20000,
        },
      },
    }).select("-password");
    return res.status(200).json({ success: true, bloobank });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  searchDonorHandler,
  searchBloodBankHandler,
  getNearestDonor,
  getNearestBloodBank
};
