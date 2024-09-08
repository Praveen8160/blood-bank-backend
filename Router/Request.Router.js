const express = require("express");
const {
  bloodRequestB2Bhandler,
  bloodRequestD2Dhandler,
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
module.exports = router;
