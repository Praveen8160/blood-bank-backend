const express = require("express");
const { donorRegisterhandler } = require("../controller/Donor.controller");
const router = express.Router();
router.post("/register", donorRegisterhandler);
module.exports = router;
