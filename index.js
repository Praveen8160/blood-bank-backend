require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { initSocket } = require("./service/socketHandler.js");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/certificates",
  express.static(path.join(__dirname, "controller", "certificates"))
);

const DatabaseConnection = require("./connection.js");
DatabaseConnection(process.env.mongo);

// Routers
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

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server running at http://localhost:${process.env.PORT || 5000}`)
);
