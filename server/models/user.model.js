const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userID: String,
    groupID: [String],
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  })
);

module.exports = User;
