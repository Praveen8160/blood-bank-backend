const express = require("express");
const Router = express.Router();

Router.post("/", async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  console.log("body", req.body);
  console.log("req.body.queryResult", req.body.queryResult);
  console.log("req.body.queryResult.intent", req.body.queryResult.intent);
  console.log("intentName", intentName);
  if (intentName === "FindDonorByBloodType") {
    const bloodType = req.body.queryResult.parameters.bloodType;
    console.log("bloodType", bloodType);
    // Query the database for matching donors
    // const donors = await User.find({ bloodType });
    // donors = [
    //   {
    //     name: "raj",
    //   },
    // ];
    if (donors.length > 0) {
      //   let donorList = donors.map((donor) => donor.name).join(', ');
      res.json({
        fulfillmentText: `Here are the donors with blood type ${bloodType}`,
      });
    } else {
      res.json({
        fulfillmentText: `Sorry, we couldn't find any donors with blood type ${bloodType}.`,
      });
    }
  } else {
    res.json({
      fulfillmentText: "I didn't understand your request.",
    });
  }
});
module.exports = Router;
