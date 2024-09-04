const Donor = require("../models/Donor.model.js");
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
module.exports = {
  searchDonorHandler,
};
