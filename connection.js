const mongoose = require("mongoose");
const databaseConnection = async (url) => {
  try {
    await mongoose
      .connect(url)
      .then(() => console.log("connection Successfully"))
      .catch((err) => console.log(`Error to connect Database ${err}`));
  } catch (error) {
    console.log(error);
  }
};
module.exports = databaseConnection;
