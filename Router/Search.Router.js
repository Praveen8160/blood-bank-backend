const express = require("express");
const {
  searchDonorHandler,
  searchBloodBankHandler,
  getNearestDonor,
  getNearestBloodBank,
} = require("../controller/Search.controller");
const router = express.Router();
router.post("/getDonor", searchDonorHandler);
router.post("/getNearestDonor", getNearestDonor);
router.post("/getBloodBank", searchBloodBankHandler);
router.post("/getNearestBloodBank", getNearestBloodBank);
module.exports = router;
