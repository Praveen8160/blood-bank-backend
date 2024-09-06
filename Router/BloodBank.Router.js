const express=require("express")
const { registerBloodBankHandler } = require("../controller/BloodBank.controller")
const router=express.Router()
router.post("/register",registerBloodBankHandler)
module.exports=router