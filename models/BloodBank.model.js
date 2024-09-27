const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bloodBankschema = new mongoose.Schema({
  bloodBankName: {
    type: String,
    required: true,
  },
  parentHospital: {
    type: String,
    default: "No Parent Hospital",
  },
  website: {
    type: String,
    default: "No Website",
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  availableBloods: {
    type: Map,
    of: Number,
    default: {
      "A+": 0,
      "A-": 0,
      "B+": 0,
      "B-": 0,
      "AB+": 0,
      "AB-": 0,
      "O+": 0,
      "O-": 0,
    },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // 'Point' is the only supported geometry type
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers [longitude, latitude]
      required: true,
    },
  },
});
bloodBankschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
bloodBankschema.methods.checkpassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
bloodBankschema.index({ location: "2dsphere" });
const bloodBankModel = mongoose.model("bloodBank", bloodBankschema);

module.exports = bloodBankModel;
