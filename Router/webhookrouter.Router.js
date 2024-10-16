const express = require("express");
const Router = express.Router();
const Donor = require("../models/Donor.model.js");
Router.post("/", async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  let State = "";
  let District = "";
  switch (intentName) {
    case "FindDonorByBloodType":
      console.log(req.body.queryResult.parameters);
      const bloodType = req.body.queryResult.parameters.bloodType;
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
      const { State, District } = req.body.queryResult.parameters;
      console.log(State, " ", District);
      res.json({
        fulfillmentText: `Sorry, we couldn't find any camp in ${State} and ${District}.`,
      });
  }
});
module.exports = Router;
