const DonorRequest = require("../models/DonorRequest.js");
const bloodBankRequestModel = require("../models/BloodBankRequest.js");
const BloodBank = require("../models/BloodBank.model.js");
const Donor = require("../models/Donor.model.js");
const B2Drequest = require("../models/BloodbanktoDonorRequest.model.js");
const { getIo, getActiveUsers } = require("../service/socketHandler.js");
const MessageModel = require("../models/Message.model.js");
const isrecipientOnline = (recipientSocketId, bloodGroup, requester) => {
  getIo()
    .to(recipientSocketId)
    .emit("newBloodRequest", {
      message: `New blood request for ${bloodGroup} blood from ${requester}`,
    });
};
const isrecipientOofOnline = async (id, bloodGroup, requester) => {
  await MessageModel.create({
    recipient: id, // Recipient userId
    message: `New blood request for ${bloodGroup} blood from ${requester}`,
    status: "unread",
  });
};
const bloodRequestB2Bhandler = async (req, res) => {
  try {
    const { bloodGroup, Quantity, reason, id } = req.body;

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
    console.log(requester);
    const newBloodRequest = await bloodBankRequestModel.create({
      requester: req.user.id,
      recipientId: id,
      bloodgroup: bloodGroup,
      quantity: Quantity,
      Reason: reason,
      status: "Pending",
    });

    if (newBloodRequest) {
      const recipientSocketId = getActiveUsers().get(id);
      // console.log("recipientSocketId", getActiveUsers());
      // console.log(recipientSocketId);
      if (recipientSocketId) {
        // console.log(`Notification sent to blood bank ${id}`);
        isrecipientOnline(
          recipientSocketId,
          bloodGroup,
          requester.bloodBankName
        );
      } else if (!recipientSocketId) {
        isrecipientOofOnline(id, bloodGroup, requester.bloodBankName);
      }
      return res
        .status(200)
        .json({ success: true, message: "Request Created" });
    } else {
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
      const recipientSocketId = getActiveUsers().get(id);
      if (recipientSocketId) {
        isrecipientOnline(recipientSocketId, bloodgroup, requester.fullname);
      } else if (!recipientSocketId) {
        isrecipientOofOnline(id, bloodgroup, requester.fullname);
      }
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
const bloodRequestB2Dhandler = async (req, res) => {
  try {
    const { bloodgroup, Quantity, Reason, id } = req.body;
    // console.log(req.body);
    const recipient = await Donor.findById(id);
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
    const newBloodRequest = await B2Drequest.create({
      requester: req.user.id,
      recipientId: id,
      bloodgroup: bloodgroup,
      quantity: Quantity,
      Reason: Reason,
      status: "Pending",
    });
    if (newBloodRequest) {
      const recipientSocketId = getActiveUsers().get(id);
      if (recipientSocketId) {
        isrecipientOnline(
          recipientSocketId,
          bloodgroup,
          requester.bloodBankName
        );
      } else if (!recipientSocketId) {
        isrecipientOofOnline(id, bloodgroup, requester.bloodBankName);
      }
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
const getBloodbakAllRequest = async (req, res) => {
  try {
    const allRequest = await bloodBankRequestModel
      .find({ recipientId: req.user.id })
      .populate({
        path: "requester",
        select: "bloodBankName mobile address",
      });
    if (allRequest) {
      return res.status(200).json({ success: true, data: allRequest });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const updateBloodbakRequestStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const request = await bloodBankRequestModel.findById(id);
    if (request) {
      request.status = status;
      await request.save();
      return res
        .status(200)
        .json({ success: true, message: "Request Updated" });
    } else {
      console.log("object");
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getAllBloodbankRequestforBlood = async (req, res) => {
  try {
    const allRequest1 = await bloodBankRequestModel
      .find({ requester: req.user.id })
      .populate({
        path: "recipientId",
        select: "bloodBankName mobile address pincode",
      });
    const allRequest2 = await B2Drequest.find({
      requester: req.user.id,
    }).populate({
      path: "recipientId",
      select: "fullname mobile address pincode",
    });
    const allRequest = [...allRequest1, ...allRequest2];
    if (allRequest) {
      return res.status(200).json({ success: true, data: allRequest });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getDonorRequest = async (req, res) => {
  try {
    const Request1 = await DonorRequest.find({
      recipientId: req.user.id,
    }).populate({
      path: "requester",
      select: "fullname mobile address pincode",
    });
    const Request2 = await B2Drequest.find({
      recipientId: req.user.id,
    }).populate({
      path: "requester",
      select: "bloodBankName mobile address pincode",
    });
    const allRequest = [...Request1, ...Request2];
    console.log(allRequest);
    if (allRequest) {
      return res.status(200).json({ success: true, data: allRequest });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const updateDonorRequestStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const request = await DonorRequest.findById(id);
    if (request) {
      request.status = status;
      await request.save();
      return res
        .status(200)
        .json({ success: true, message: "Request Updated" });
    } else {
      const request2 = await B2Drequest.findById(id);
      if (request2) {
        request2.status = status;
        await request2.save();
        return res
          .status(200)
          .json({ success: true, message: "Request Updated" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Request not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getAllDonorRequestforBlood = async (req, res) => {
  try {
    const allRequest = await DonorRequest.find({
      requester: req.user.id,
    }).populate({
      path: "recipientId",
      select: "fullname mobile address pincode",
    });

    if (allRequest) {
      return res.status(200).json({ success: true, data: allRequest });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const removeallnotification= async (req, res) => {
  try {
    const allRequest = await MessageModel.deleteMany({
      recipient: req.user.id,
    });
    
    return res.status(200).json({ success: true, message: "Notification removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  bloodRequestB2Bhandler,
  bloodRequestD2Dhandler,
  bloodRequestB2Dhandler,
  getBloodbakAllRequest,
  updateBloodbakRequestStatus,
  getAllBloodbankRequestforBlood,
  getDonorRequest,
  updateDonorRequestStatus,
  getAllDonorRequestforBlood,
  removeallnotification
};
