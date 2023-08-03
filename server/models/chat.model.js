const mongoose = require("mongoose");

const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema({
    history: [
      {
        id: String,
        username: String,
        message: String,
      },
    ],
    groupID: String,
    name: String,
    users: [String],
  })
);

module.exports = Chat;
