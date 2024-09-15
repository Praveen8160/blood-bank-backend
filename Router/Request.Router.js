const express = require("express");
const {
  bloodRequestB2Bhandler,
  bloodRequestD2Dhandler,
  getBloodbakAllRequest,
  updateBloodbakRequestStatus,
  getAllBloodbankRequestforBlood,
  getDonorRequest,
  updateDonorRequestStatus,
  getAllDonorRequestforBlood,
  bloodRequestB2Dhandler,
} = require("../controller/Request.controller");
const checkAuthenticationCookie = require("../middleware/CookieAuthentication.middleware");
const router = express.Router();

//send request for blood
router.post(
  "/bloodRequestB2Bhandler",
  checkAuthenticationCookie("usertoken"),
  bloodRequestB2Bhandler
);
router.post(
  "/bloodRequestDonor2Donorhandler",
  checkAuthenticationCookie("usertoken"),
  bloodRequestD2Dhandler
);
router.post(
  "/bloodRequestB2Dhandler",
  checkAuthenticationCookie("usertoken"),
  bloodRequestB2Dhandler
);
// manage request for blood to blood bank and manage request blood bank to blood bank for blood
router.get(
  "/getBloodbakAllRequest",
  checkAuthenticationCookie("usertoken"),
  getBloodbakAllRequest
);
router.put("/updateBloodbakRequestStatus", updateBloodbakRequestStatus);
router.get(
  "/getAllBloodbankRequestforBlood",
  checkAuthenticationCookie("usertoken"),
  getAllBloodbankRequestforBlood
);

// manage request to Donor for blood and manage request Donor to Donor for blood
router.get(
  "/getDonorRequest",
  checkAuthenticationCookie("usertoken"),
  getDonorRequest
);
router.put("/updateDonorRequestStatus", updateDonorRequestStatus);
router.get(
  "/getAllDonorRequestforBlood",
  checkAuthenticationCookie("usertoken"),
  getAllDonorRequestforBlood
);
module.exports = router;
