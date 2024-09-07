const express = require("express");
const {
  registerBloodBankHandler,
  loginBloodBankHandler,
  getBloodBankDatahandler,
  addbloodhandler,
  getAllBloodDatahandler,
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
router.post(
  "/addBloood",
  checkAuthenticationCookie("usertoken"),
  addbloodhandler
);
router.get(
  "/getAllBloodData",
  checkAuthenticationCookie("usertoken"),
  getAllBloodDatahandler
);
module.exports = router;
