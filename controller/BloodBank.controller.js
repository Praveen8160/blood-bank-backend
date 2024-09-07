const BloodBank = require("../models/BloodBank.model.js");
const { setUserToken } = require("../service/authentication.js");
const registerBloodBankHandler = async (req, res) => {
  try {
    const {
      bloodBankName,
      parentHospital,
      website,
      mobile,
      email,
      password,
      category,
      state,
      district,
      address,
      pincode,
    } = req.body;
    const exist = await BloodBank.findOne({ email: req.body.email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }
    const newBloodBank = await BloodBank.create({
      bloodBankName,
      parentHospital,
      website,
      mobile,
      email,
      password,
      category,
      state,
      district,
      address,
      pincode,
    });
    if (newBloodBank) {
      return res
        .status(200)
        .json({ success: true, nessage: "Registred Successfully" });
    } else {
      return res.status(400).json({
        success: false,
        message: "Registration Failed please try again",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const loginBloodBankHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const bank = await BloodBank.findOne({ email });
    if (bank) {
      const checkpassword = await bank.checkpassword(password);
      if (checkpassword) {
        const userToken = setUserToken(bank, "bloodbank");
        res.cookie("usertoken", userToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        return res
          .status(200)
          .json({ success: true, message: "Login Successfully" });
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
    console.log("server error in Login", error);
    return res
      .status(500)
      .json({ success: false, message: "Intenal Server Error" });
  }
};
const getBloodBankDatahandler = async (req, res) => {
  try {
    // console.log(req.user.id);
    const bloodBank = await BloodBank.findOne({ _id: req.user.id });
    if (bloodBank) {
      res.status(200).json({ success: true, data: bloodBank });
    } else {
      res.status(404).json({ success: false, message: "Donor not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  registerBloodBankHandler,
  loginBloodBankHandler,
  getBloodBankDatahandler,
};
