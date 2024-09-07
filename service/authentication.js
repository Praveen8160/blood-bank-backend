const jwt = require("jsonwebtoken");
const setUserToken = (user, role) => {
  // console.log(user, role);
  return jwt.sign(
    {
      id: user._id,
      role: role,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
};
const getUserToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    return payload;
  } catch (error) {
    console.log("error at getting token", error);
  }
};
module.exports = {
  setUserToken,
  getUserToken,
};
