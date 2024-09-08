const DonorRequest = require("../models/DonorRequest.js");
const bloodBankRequestModel = require("../models/BloodBankRequest.js");
const BloodBank = require("../models/BloodBank.model.js");
const Donor = require("../models/Donor.model.js");
const bloodRequestB2Bhandler = async (req, res) => {
  try {
    const { bloodGroup, Quantity, reason, id } = req.body;
    console.log(req.body);
    const recipient = await BloodBank.findById(id);
    const requester = await BloodBank.findById(req.user.id);
    if (!recipient) {
      return res
        .status(404)
        .json({ success: false, message: "Recipient not found" });
    }
    if (!requester) {
      return res
        .status(404)
        .json({ success: false, message: "Requester not found" });
    }
    const newBloodRequest = await bloodBankRequestModel.create({
      requester: req.user.id,
      recipientId: id,
      bloodgroup: bloodGroup,
      quantity: Quantity,
      Reason: reason,
      status: "Pending",
    });
    if (newBloodRequest) {
      console.log("done");
      return res
        .status(200)
        .json({ success: true, message: "Request Created" });
    } else {
      console.log("object");
      return res
        .status(400)
        .json({ success: false, message: "Request Failed" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const bloodRequestD2Dhandler = async (req, res) => {
  try {
    const { bloodgroup, Quantity, Reason, id } = req.body;
    console.log(id);
    const recipient = await Donor.findById(id);
    let requester = await Donor.findById(req.user.id);
    if (!recipient) {
      return res
        .status(404)
        .json({ success: false, message: "Recipient not found" });
    }
    if (!requester) {
      requester = await BloodBank.findById(req.user.id);
      if (!requester) {
        return res
          .status(404)
          .json({ success: false, message: "Requester not found" });
      }
    }
    const newBloodRequest = await DonorRequest.create({
      requester: req.user.id,
      recipientId: id,
      bloodgroup: bloodgroup,
      quantity: Quantity,
      Reason: Reason,
      status: "Pending",
    });
    if (newBloodRequest) {
      //   console.log("done");
      return res
        .status(200)
        .json({ success: true, message: "Request Created" });
    } else {
      //   console.log("error");
      return res
        .status(400)
        .json({ success: false, message: "Request Failed" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  bloodRequestB2Bhandler,
  bloodRequestD2Dhandler,
};
