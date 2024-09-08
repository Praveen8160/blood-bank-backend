const mongoose = require("mongoose");
const BBRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bloodBank",
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bloodBank",
    required: true,
  },
  Reason: {
    type: String,
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
const bloodBankRequestModel = mongoose.model("bloodbankrequest", BBRequestSchema);
module.exports = bloodBankRequestModel;
