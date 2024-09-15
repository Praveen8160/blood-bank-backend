const mongoose = require("mongoose");
const B2DRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bloodBank",
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  Reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const B2DRequestModel = mongoose.model("B2Drequest", B2DRequestSchema);
module.exports = B2DRequestModel;
