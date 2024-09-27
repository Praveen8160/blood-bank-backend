const express = require("express");
const {
  searchDonorHandler,
  searchBloodBankHandler,
  getNearestDonor,
} = require("../controller/Search.controller");
const router = express.Router();
router.post("/getDonor", searchDonorHandler);
router.post("/getNearestDonor", getNearestDonor);
router.post("/getBloodBank", searchBloodBankHandler);
module.exports = router;
