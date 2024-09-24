const Donor = require("../models/Donor.model.js");
const { setUserToken } = require("../service/authentication.js");
const donorRegisterhandler = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      address,
      mobile,
      bloodGroup,
      state,
      district,
      pincode,
      age,
    } = req.body;
    const exist = await Donor.findOne({ email: email });
    if (exist) {
      // console.log("exist");
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }
    const newDonor = await Donor.create({
      fullname,
      email,
      password,
      address,
      mobile,
      bloodGroup,
      state,
      district,
      pincode,
      age,
    });
    if (newDonor) {
      return res
        .status(200)
        .json({ success: true, nessage: "Donor Registred Successfully" });
    } else {
      return res.status(400).json({
        success: false,
        message: "Donor Registration Failed please try again",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const donorloginhnadler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const donor = await Donor.findOne({ email });
    if (donor) {
      const checkpassword = await donor.checkpassword(password);
      if (checkpassword) {
        const userToken = setUserToken(donor, "donor");
        // console.log(userToken);
        res.cookie("usertoken", userToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        return res.status(200).json({
          success: true,
          message: "Login Successfully",
          id: donor._id,
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Credentials" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    // console.log("server error in Login", error);
    return res
      .status(500)
      .json({ success: false, message: "Intenal Server Error" });
  }
};
const getDonorDatahandler = async (req, res) => {
  try {
    const donor = await Donor.findOne({ _id: req.user.id }).select(
      "fullname email address mobile bloodGroup state district pincode age"
    );
    if (donor) {
      res.status(200).json({ success: true, data: donor });
    } else {
      res.status(404).json({ success: false, message: "Donor not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const UpdateDonorDatahandler = async (req, res) => {
  try {
    const donor = await Donor.findOne({ _id: req.user.id });
    console.log(req.body);
    if (donor) {
      const {
        fullname,
        email,

        address,
        mobile,
        bloodGroup,
        state,
        district,
        pincode,
        age,
      } = req.body;
      donor.fullname = fullname;
      donor.email = email;
      donor.address = address;
      donor.mobile = mobile;
      donor.bloodGroup = bloodGroup;
      donor.state = state;
      donor.district = district;
      donor.pincode = pincode;
      donor.age = age;
      await donor.save();
      res.status(200).json({ success: true, message: "Profile Updated" });
    } else {
      res.status(404).json({ success: false, message: "Donor not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getTotalDonorhandler = async (req, res) => {
  try {
    const totalDonor = await Donor.countDocuments();
    res.status(200).json({ success: true, data: totalDonor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  donorRegisterhandler,
  donorloginhnadler,
  getDonorDatahandler,
  getTotalDonorhandler,
  UpdateDonorDatahandler,
};
