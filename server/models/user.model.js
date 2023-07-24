const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userID: String,
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    firebaseToken: String,
  })
);

module.exports = User;
