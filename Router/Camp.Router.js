const express = require("express");
const {
  AddCampHandler,
  searchCampHandler,
  donorCampRegisterHandler,
} = require("../controller/Camp.controller");
const checkAuthenticationCookie = require("../middleware/CookieAuthentication.middleware");
const router = express.Router();
router.post("/AddCamp", checkAuthenticationCookie("usertoken"), AddCampHandler);
router.post(
  "/searchCamp",
  searchCampHandler
);
router.post("/donorCampRegister", checkAuthenticationCookie("usertoken"), donorCampRegisterHandler);
module.exports = router;
