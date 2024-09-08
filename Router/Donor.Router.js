const express = require("express");
const {
  donorRegisterhandler,
  donorloginhnadler,
  getDonorDatahandler,
  getTotalDonorhandler,
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
router.get("/getTotalDonor",getTotalDonorhandler)
module.exports = router;
