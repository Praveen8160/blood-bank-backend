const express = require("express");
const {
  donorRegisterhandler,
  donorloginhnadler,
  getDonorDatahandler,
} = require("../controller/Donor.controller");
const checkAuthenticationCookie = require("../middleware/CookieAuthentication.middleware");
const router = express.Router();
router.post("/register", donorRegisterhandler);
router.post("/login", donorloginhnadler);
router.get(
  "/getDonor",
  checkAuthenticationCookie("usertoken"),
  getDonorDatahandler
);
module.exports = router;
