const mongoose = require('mongoose')

const Habit = mongoose.model(
    "Habit",
    new mongoose.Schema({
        userID: String,
        name: String,
        days: [Boolean],
        startTime: Date,
        endTime: Date,
    })
)

module.exports = Habit