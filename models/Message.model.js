const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "unread",
  },
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
