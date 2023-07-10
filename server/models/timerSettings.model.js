const mongoose = require("mongoose");

const TimerSetting = mongoose.model(
  "TimerSettings",
  new mongoose.Schema({
    pomodoroTime: Number,
    shortBreakTime: Number,
    longBreakTime: Number,
    userID: String,
  })
);

module.exports = TimerSetting;
