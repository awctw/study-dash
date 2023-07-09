const mongoose = require('mongoose')

const Habit = mongoose.model(
    "Habit",
    new mongoose.Schema({
        userID: String,
        name: String,
    })
)

module.exports = Habit