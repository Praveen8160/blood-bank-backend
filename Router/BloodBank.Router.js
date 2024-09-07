const express = require("express");
const {
  registerBloodBankHandler,
  loginBloodBankHandler,
  getBloodBankDatahandler,
} = require("../controller/BloodBank.controller");
const checkAuthenticationCookie = require("../middleware/CookieAuthentication.middleware");
const router = express.Router();
router.post("/register", registerBloodBankHandler);
router.post("/login", loginBloodBankHandler);
router.get(
  "/getBloodBank",
  checkAuthenticationCookie("usertoken"),
  getBloodBankDatahandler
);
module.exports = router;
