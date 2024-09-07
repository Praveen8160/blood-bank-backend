const express = require("express");
const {
  Authhandler,
  logouthandler,
} = require("../controller/Authentication.controller");
const router = express.Router();
router.get("/auth", Authhandler);
router.post("/logout", logouthandler);
module.exports = router;
