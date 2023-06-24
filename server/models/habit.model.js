const mongoose = require('mongoose')

const Habit = mongoose.model(
    "Habit",
    new mongoose.Schema({
        name: String,
    })
)

module.exports = Habit