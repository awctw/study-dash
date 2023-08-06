const ChartSettings= require('../models/chartSettings.model');
const Category = require("../models/Category.model");

const getChartSettings = async (req, res, next) => {
    try {
        const result = await ChartSettings.findOne({ userID: req.params.userID });
        if (!result) {
            const chartSettings = new ChartSettings({
                userID: req.params.userID,
                axisTimeScale: 24,
                axisVerticalScale: 21,
            });
            await chartSettings.save()
            res.status(200).send(chartSettings);
        } else {
            res.status(200).send(result);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const putChartSettings = async (req, res, next) => {
    await ChartSettings.findOneAndUpdate({ userID: req.params.userID },
        req.body, { new: true, upsert: true })
        .then((result) => {
            res.status(200).send({
                userID: req.params.userID,
                axisTimeScale: result.axisTimeScale,
                axisVerticalScale: result.axisVerticalScale,
                categoryColors: result.categoryColors
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

module.exports = {
    getChartSettings,
    putChartSettings,
}