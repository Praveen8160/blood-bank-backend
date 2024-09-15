const express = require("express");
const {
  AddCampHandler,
  searchCampHandler,
  donorCampRegisterHandler,
  getallCamphandler,
  updateDonorStatus,
  donorCampRegisteredHandler,
  cancelRegistration,
  deleteCamphandler,
} = require("../controller/Camp.controller");
const checkAuthenticationCookie = require("../middleware/CookieAuthentication.middleware");
const router = express.Router();
router.post("/searchCamp", searchCampHandler);

// Router For Blood Bank
router.post("/AddCamp", checkAuthenticationCookie("usertoken"), AddCampHandler);
router.get(
  "/allCamp",
  checkAuthenticationCookie("usertoken"),
  getallCamphandler
);
router.put("/updateDonorStatus", updateDonorStatus);
router.delete("/deleteCamp", deleteCamphandler);

// Router For Donor
router.post(
  "/donorCampRegister",
  checkAuthenticationCookie("usertoken"),
  donorCampRegisterHandler
);
router.get(
  "/donorCampRegistered",
  checkAuthenticationCookie("usertoken"),
  donorCampRegisteredHandler
);
router.delete(
  "/cancelRegistration",
  checkAuthenticationCookie("usertoken"),
  cancelRegistration
);
module.exports = router;
