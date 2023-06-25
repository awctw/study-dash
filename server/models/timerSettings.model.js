const mongoose = require("mongoose");

const Timer = mongoose.model(
  "Timer",
  new mongoose.Schema({
    pomodoroTime: Number,
    shortBreakTime: Number,
    longBreakTime: Number,
    _id: String,
  })
);

module.exports = Timer;
