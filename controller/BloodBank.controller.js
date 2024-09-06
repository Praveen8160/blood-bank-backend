const BloodBank = require("../models/BloodBank.model.js");
const { setUserToken } = require("../service/authebtication.js");
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
        res.cookie("token", userToken, {
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
module.exports = { registerBloodBankHandler, loginBloodBankHandler };
