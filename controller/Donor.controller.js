const Donor = require("../models/Donor.model.js");
const { setUserToken } = require("../service/authebtication.js");
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
      console.log("exist");
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
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
    // console.log("server error in Login", error);
    return res
      .status(500)
      .json({ success: false, message: "Intenal Server Error" });
  }
};
module.exports = {
  donorRegisterhandler,
  donorloginhnadler,
};
