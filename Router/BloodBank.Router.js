const express = require("express");
const {
  registerBloodBankHandler,
  loginBloodBankHandler,
  getBloodBankDatahandler,
  addbloodhandler,
  getAllBloodDatahandler,
  subbloodhandler,
  getAvailableBlood,
  getTotalBloodBank,
  updateBloodbankDatahandler,
  getBloodBankLocation,
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
router.post(
  "/subBlood",
  checkAuthenticationCookie("usertoken"),
  subbloodhandler
);
router.get(
  "/getAllBloodData",
  checkAuthenticationCookie("usertoken"),
  getAllBloodDatahandler  
);
router.get("/getAvailableBlood/:id", getAvailableBlood);
router.get("/getTotalBloodBank", getTotalBloodBank);
router.put("/updateBloodbankDatahandler",checkAuthenticationCookie("usertoken"),updateBloodbankDatahandler)
router.get("/getBloodBankLocation",getBloodBankLocation)
module.exports = router;
