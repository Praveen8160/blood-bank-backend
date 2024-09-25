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
          .json({ success: true, message: "Login Successfully", id: bank._id });
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
    const bloodBank = await BloodBank.findOne({ _id: req.user.id }).select(
      "bloodBankName parentHospital website mobile email category state district address pincode"
    );
    if (bloodBank) {
      res.status(200).json({ success: true, data: bloodBank });
    } else {
      res.status(404).json({ success: false, message: "Donor not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const addbloodhandler = async (req, res) => {
  try {
    const { bloodgroup, quantity } = req.body;
    const bloodBank = await BloodBank.findById(req.user.id);
    if (!bloodBank) {
      return res
        .status(404)
        .json({ success: false, message: "Blood Bank not found" });
    }
    if (bloodBank.availableBloods.has(bloodgroup)) {
      bloodBank.availableBloods.set(
        bloodgroup,
        bloodBank.availableBloods.get(bloodgroup) + parseInt(quantity)
      );
    }
    await bloodBank.save();

    res
      .status(200)
      .json({ success: true, message: "Blood Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const subbloodhandler = async (req, res) => {
  try {
    const { bloodgroup, quantity } = req.body;
    const bloodBank = await BloodBank.findById(req.user.id);
    if (!bloodBank) {
      return res
        .status(404)
        .json({ success: false, message: "Blood Bank not found" });
    }
    if (
      bloodBank.availableBloods.has(bloodgroup) &&
      bloodBank.availableBloods.get(bloodgroup) >= parseInt(quantity)
    ) {
      bloodBank.availableBloods.set(
        bloodgroup,
        bloodBank.availableBloods.get(bloodgroup) - parseInt(quantity)
      );
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Quantity is too high" });
    }
    // else {
    //   bloodBank.availableBloods.set(bloodgroup, quantity);
    // }
    await bloodBank.save();
    res
      .status(200)
      .json({ success: true, message: "Blood Subtracted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getAllBloodDatahandler = async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.user.id);
    if (!bloodBank) {
      return res
        .status(404)
        .json({ success: false, message: "Blood Bank not found" });
    }
    res.status(200).json({ success: true, data: bloodBank.availableBloods });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getAvailableBlood = async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    if (!bloodBank) {
      return res
        .status(404)
        .json({ success: false, message: "Blood Bank not found" });
    }
    res.status(200).json({ success: true, data: bloodBank.availableBloods });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getTotalBloodBank = async (req, res) => {
  try {
    const totalBloodBank = await BloodBank.countDocuments();
    res.status(200).json({ success: true, data: totalBloodBank });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const updateBloodbankDatahandler = async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.user.id);
    if (!bloodBank) {
      return res
        .status(404)
        .json({ success: false, message: "Blood Bank not found" });
    }
    const {
      bloodBankName,
      parentHospital,
      website,
      mobile,
      email,
      category,
      state,
      district,
      address,
      pincode,
    } = req.body;
    bloodBank.bloodBankName = bloodBankName;
    bloodBank.parentHospital = parentHospital;
    bloodBank.website = website;
    bloodBank.mobile = mobile;
    bloodBank.email = email;
    bloodBank.category = category;
    bloodBank.state = state;
    bloodBank.district = district;
    bloodBank.address = address;
    bloodBank.pincode = pincode;
    await bloodBank.save();
    return res
      .status(200)
      .json({ success: true, message: "Blood Bank Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  registerBloodBankHandler,
  loginBloodBankHandler,
  getBloodBankDatahandler,
  addbloodhandler,
  getAllBloodDatahandler,
  subbloodhandler,
  getAvailableBlood,
  getTotalBloodBank,
  updateBloodbankDatahandler,
};
