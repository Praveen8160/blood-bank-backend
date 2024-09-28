const Donor = require("../models/Donor.model.js");
const { setUserToken } = require("../service/authentication.js");
const axios = require("axios");
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
      latitude,
      longitude,
      pincode,
      age,
    } = req.body;

    console.log(latitude);
    console.log(longitude);

    // Check if donor already exists
    const exist = await Donor.findOne({ email: email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Initialize location object with the required structure
    let location = {
      type: "Point",
      coordinates: [longitude, latitude], // This is [longitude, latitude]
    };

    // If latitude or longitude is missing, perform geocoding
    if (!latitude || !longitude) {
      const fullAddress = `${address},${district},${state}`;
      console.log(fullAddress);
      const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        fullAddress
      )}`;

      try {
        console.log(geoUrl);
        const response = await axios.get(geoUrl);
        console.log(response.data);

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0]; // Extract latitude and longitude
          location.coordinates = [parseFloat(lon), parseFloat(lat)]; // Set coordinates in [longitude, latitude] format
        } else {
          return res.status(400).json({
            success: false,
            message:
              "Unable to fetch location, please click on 'Get current location' button",
          });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Geocoding failed" });
      }
    }

    // Create new donor
    const newDonor = await Donor.create({
      fullname,
      email,
      password,
      address,
      mobile,
      bloodGroup,
      state,
      district,
      location, // Pass the correctly formatted location object
      pincode,
      age,
    });

    if (newDonor) {
      return res
        .status(200)
        .json({ success: true, message: "Donor registered successfully" });
    } else {
      return res.status(400).json({
        success: false,
        message: "Donor registration failed, please try again",
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
const getDonorLocation = async (req, res) => {
  try {
    const donor = await Donor.find().select("location fullname bloodGroup");
    return res.status(200).json({ success: true, donor });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  donorRegisterhandler,
  donorloginhnadler,
  getDonorDatahandler,
  getTotalDonorhandler,
  UpdateDonorDatahandler,
  getDonorLocation
};
