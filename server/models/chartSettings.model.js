const mongoose = require("mongoose");

const ChartSettings = mongoose.model(
    "ChartSettings",
    new mongoose.Schema({
        userID: String,
        axisScale: Number,
        categoryColors: [{ categoryID: String, category: String, color: String}]
    })
);

module.exports = ChartSettings;
