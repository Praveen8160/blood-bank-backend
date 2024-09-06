const express = require("express");
const {
  registerBloodBankHandler,
  loginBloodBankHandler,
} = require("../controller/BloodBank.controller");
const router = express.Router();
router.post("/register", registerBloodBankHandler);
router.post("/login", loginBloodBankHandler);
module.exports = router;
