const express = require("express");
const {
  donorRegisterhandler,
  donorloginhnadler,
} = require("../controller/Donor.controller");
const router = express.Router();
router.post("/register", donorRegisterhandler);
router.post("/login", donorloginhnadler);
module.exports = router;
