const mongoose = require("mongoose");
const DonorRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "donor",
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "donor",
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
const DonorRequestModel = mongoose.model("donorrequest", DonorRequestSchema);
module.exports = DonorRequestModel;