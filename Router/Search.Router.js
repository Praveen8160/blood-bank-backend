const express = require("express");
const {
  searchDonorHandler,
  searchBloodBankHandler,
} = require("../controller/Search.controller");
const router = express.Router();
router.post("/getDonor", searchDonorHandler);
router.post("/getBloodBank", searchBloodBankHandler);
module.exports = router;
