const mongoose = require("mongoose");

const ChartSettings = mongoose.model(
    "ChartSettings",
    new mongoose.Schema({
        userID: String,
        axisTimeScale: {
            type: Number,
            min: 1,
            max: 84
        },
        axisVerticalScale: {
            type: Number,
            min: 1,
            max: 100
        },
        categoryColors: [{ categoryID: String, category: String, color: String}]
    })
);

module.exports = ChartSettings;
