const express = require("express");
const {
  bloodRequestB2Bhandler,
  bloodRequestD2Dhandler,
  getBloodbakAllRequest,
  updateBloodbakRequestStatus,
  getAllBloodbankRequestforBlood,
  getDonorRequest,
} = require("../controller/Request.controller");
const checkAuthenticationCookie = require("../middleware/CookieAuthentication.middleware");
const router = express.Router();
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
router.get(
  "/getDonorRequest",
  checkAuthenticationCookie("usertoken"),
  getDonorRequest
);
module.exports = router;
