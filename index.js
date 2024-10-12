require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { initSocket } = require("./service/socketHandler.js");
const redisclient = require("./service/Redis.js");
const app = express();
const server = http.createServer(app);
// Initialize Socket.IO
initSocket(server);

// Middleware setup
app.use(
  cors({
    origin: "https://www.lifeflow.site",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
app.use("/api", (req, res) => {
  res.json({ message: "this is api route" });
});
app.use("/Donor", DonorRouter);
app.use("/Search", SearchRouter);
app.use("/bloodBank", BloodBankRouter);
app.use("/Authentication", authRouter);
app.use("/bloodrequest", requestRouter);
app.use("/camp", camprouter);

// app.use("/", (req, res) => {
//   res.send("Welcome to the Blood Bank Backend");
// });

server.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}`)
);
