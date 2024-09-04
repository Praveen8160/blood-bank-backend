const express = require("express");
const { searchDonorHandler } = require("../controller/Search.controller");
const router = express.Router();
router.post("/getDonor", searchDonorHandler);
module.exports = router;
