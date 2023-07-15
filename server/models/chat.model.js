const mongoose = require("mongoose");

const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema({
    history: [
      {
        username: String,
        message: String,
      },
    ],
    groupID: String,
    name: String,
  })
);

module.exports = Chat;
