require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: "https://e-commerce-frontend-l7j1.onrender.com",
    credentials: true, // If you are sending cookies or authorization headers
    optionsSuccessStatus: 200,
  })
);
const DatabaseConnection = require("./connection.js");
DatabaseConnection(process.env.mongo);

app.listen(process.env.PORT || 5000, () =>
  console.log(`server running in http://localhost:${process.env.PORT}`)
);
