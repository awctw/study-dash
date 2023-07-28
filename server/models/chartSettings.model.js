const mongoose = require("mongoose");

const ChartSettings = mongoose.model(
    "ChartSettings",
    new mongoose.Schema({
        userID: String,
        axisScale: {
            type: Number,
            min: 1,
            max: 84
        },
        categoryColors: [{ categoryID: String, category: String, color: String}]
    })
);

module.exports = ChartSettings;
