const ChartSettings= require('../models/chartSettings.model');

const defaultChartSettings = {
    axisScale: 24,
    categoryColors: [
        { category: "Biology", color: "#42f560" },
        { category: "Chemistry", color: "#d742f5" },
        { category: "Computer Science", color: "#55515e" },
        { category: "Language Arts", color: "#b726c7" },
        { category: "Math", color: "#2e26c7" },
        { category: "Musical Art", color: "#bfc726" },
        { category: "Physics", color: "#000000" },
        { category: "Sports", color: "#ff001e" },
        { category: "Visual Arts", color: "#ff7b00" },
        { category: "Work", color: "#00eaff" },
    ],
}

const getChartSettings = async (req, res, next) => {
    await ChartSettings.findOne({ userEmail: req.params.userEmail })
        .then((result) => {
            if (!result) {
                res.status(200).send(defaultChartSettings);
            } else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const putChartSettings = async (req, res, next) => {
    await ChartSettings.findOneAndUpdate({ userEmail: req.params.userEmail },
        req.body, { new: true, upsert: true })
        .then((result) => {
            res.status(200).send({
               axisScale: result.axisScale,
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