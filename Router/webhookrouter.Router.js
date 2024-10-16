const express = require("express");
const Router = express.Router();
const Donor = require("../models/Donor.model.js");
const Camp = require("../models/Camp.model.js");
const BloodBank = require("../models/BloodBank.model.js");
Router.post("/", async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  let State = "";
  let District = "";
  let bloodType = "";
  switch (intentName) {
    case "FindDonorByBloodType":
      console.log(req.body.queryResult.parameters);
      bloodType = req.body.queryResult.parameters.bloodType;
      State = req.body.queryResult.parameters.state;
      District = req.body.queryResult.parameters.city;
      const donors = await Donor.find({
        bloodGroup: bloodType,
        state: State,
        district: District,
      }).select("fullname address state district pincode mobile");
      if (donors.length > 0) {
        let donorList = donors
          .map((donor) => {
            return `Name: ${donor.fullname} , Address: ${donor.address}${donor.state}${donor.district}${donor.pincode} , Mobile: ${donor.mobile}   ||   `;
          })
          .join(" ");
        res.json({
          fulfillmentText: `Here are the donors with blood type ${bloodType}:${"\n"}${donorList}`,
        });
      } else {
        res.json({
          fulfillmentText: `Sorry, we couldn't find any donors with blood type ${bloodType}.`,
        });
      }
      break;
    case "FindDonationCamp":
      State = req.body.queryResult.parameters.State;
      District = req.body.queryResult.parameters.District;
      // console.log(State, " ", District);
      const camps = await Camp.find({ state: State, district: District });
      if (camps.length > 0) {
        let campList = camps
          .map((camp) => {
            return `Name: ${camp.campName} , Address: ${camp.address}${camp.pincode} , Date: ${camp.date}   ||   `;
          })
          .join(" ");
        res.json({
          fulfillmentText: `Here are the camps in ${State} and ${District}:${"\n"}${campList}`,
        });
      } else {
        res.json({
          fulfillmentText: `Sorry, we couldn't find any camp in ${State} and ${District}.`,
        });
      }
      break;
    case "FindBloodBank":
      State = req.body.queryResult.parameters.State;
      District = req.body.queryResult.parameters.District;
      const bloodBanks = await BloodBank.find({
        state: State,
        district: District,
      }).select("bloodBankName address pincode").select("bloodBankName address pincode mobile");
      if (bloodBanks.length > 0) {
        const bloodbankList = bloodBanks
          .map((bank) => {
            return `BloodBank: ${bank.bloodBankName} , Address: ${bank.address}${bank.pincode} , Mobile: ${bank.mobile}   ||   `;
          })
          .join(" ");
          res.json({
            fulfillmentText: `Here are the Bloodbank in ${State} and ${District}:${"\n"}${bloodbankList}`,
          });
      } else {
        res.json({
          fulfillmentText: `Sorry, we couldn't find any camp in ${State} and ${District}.`,
        });
      }
      break;
    default:
      res.json({
        fulfillmentText: `Sorry, we couldn't understand your request.`,
      });
  }
});
module.exports = Router;
