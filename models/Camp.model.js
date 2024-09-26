const mongoose = require("mongoose");
const CampSchema = new mongoose.Schema(
  {
    campName: {
      type: String,
      required: true,
      unique: true,
    },
    Image: {
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
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    bloodBankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bloodBank",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    donorsRegistered: [
      {
        donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
        donorName: { type: String },
        bloodType: { type: String },
        contact: { type: String },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected", "Completed"],
          default: "Pending",
        },
      },
    ],
  },
  { timestamps: true }
);

const campmodel = mongoose.model("Camp", CampSchema);
module.exports = campmodel;
