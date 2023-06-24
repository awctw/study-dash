const ChartSettings= require('../models/chartSettings.model');

const getChartSettings = async (req, res, next) => {
    await ChartSettings.find({ userID: req.params.userID })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}

const putChartSettings = async (req, res, next) => {
    await ChartSettings.findOneAndUpdate({ userID: req.params.userID },
        req.body, { new: true, upsert: true })
        .then((result) => {
            res.status(200).send({
               axisScale: result.axisScale,
               categoryColors: result.categoryColors
            });
        })
        .catch(err => {
            res.status(400).send(err);
        });
}