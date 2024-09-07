const { getUserToken } = require("../service/authentication");

const Authhandler = async (req, res) => {
  const Token = req.cookies.usertoken;
  // console.log(Token)
  if (Token) {
    const payload = getUserToken(Token);
    // console.log(payload);
    payload
      ? res.json({ success: true, data: payload })
      : res.json({ success: false });
  } else {
    res.json({ success: false });
  }
};
const logouthandler = async (req, res) => {
  try {
    res.clearCookie("usertoken");
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
};
module.exports = {
  Authhandler,
  logouthandler,
};
