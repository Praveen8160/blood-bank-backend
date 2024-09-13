require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // If you are sending cookies or authorization header
  })
);
app.use(cookieParser());
app.use(express.json()); //for accept json data
app.use(express.urlencoded({ extended: false }));

const DatabaseConnection = require("./connection.js");
DatabaseConnection(process.env.mongo);

//Routers
const DonorRouter = require("./Router/Donor.Router.js");
const SearchRouter = require("./Router/Search.Router.js");
const BloodBankRouter = require("./Router/BloodBank.Router.js");
const authRouter = require("./Router/Authentication.Router.js");
const requestRouter = require("./Router/Request.Router.js");
const camprouter = require("./Router/Camp.Router.js");
app.use("/Donor", DonorRouter);
app.use("/Search", SearchRouter);
app.use("/bloodBank", BloodBankRouter);
app.use("/Authentication", authRouter);
app.use("/bloodrequest", requestRouter);
app.use("/camp", camprouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`server running in http://localhost:${process.env.PORT}`)
);
