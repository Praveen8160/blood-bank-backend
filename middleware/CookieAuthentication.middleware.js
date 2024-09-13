const { getUserToken } = require("../service/authentication.js");
const checkAuthenticationCookie = (token) => {
  return (req, res, next) => {
    const Token = req.cookies[token];
    if (!Token) {
      return res.status(403).json({ message: "unauthorized user" });
    }
    try {
      const payload = getUserToken(Token);
      req.user = payload;
      return next();
    } catch (error) {
      return res.sendStatus(403);
    }
  };
};
module.exports = checkAuthenticationCookie;
