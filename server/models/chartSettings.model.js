const mongoose = require("mongoose");

const ChartSettings = mongoose.model(
    "ChartSettings",
    new mongoose.Schema({
        userEmail: String,
        axisScale: Number,
        categoryColors: [{ category: String, color: String}]
    })
);

module.exports = ChartSettings;
