const express = require("express");
const Router = express.Router();

Router.post("/", (req, res) => {
  console.log(req.body);
  res.send("ok");
});
module.exports = Router;
