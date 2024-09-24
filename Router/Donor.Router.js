const express = require("express");
const {
  donorRegisterhandler,
  donorloginhnadler,
  getDonorDatahandler,
  getTotalDonorhandler,
  UpdateDonorDatahandler,
} = require("../controller/Donor.controller");
const checkAuthenticationCookie = require("../middleware/CookieAuthentication.middleware");
const { route } = require("./Request.Router");
const router = express.Router();
router.post("/register", donorRegisterhandler);
router.post("/login", donorloginhnadler);
router.get(
  "/getDonor",
  checkAuthenticationCookie("usertoken"),
  getDonorDatahandler
);
router.put("/updateDonor", checkAuthenticationCookie("usertoken"),UpdateDonorDatahandler)
router.get("/getTotalDonor",getTotalDonorhandler)
module.exports = router;
