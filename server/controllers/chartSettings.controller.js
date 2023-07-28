const ChartSettings= require('../models/chartSettings.model');
const Category = require("../models/Category.model");

const getChartSettings = async (req, res, next) => {
    try {
        const result = await ChartSettings.findOne({ userID: req.params.userID });
        if (!result) {
            let categoryColors = [];
            for (const category of await Category.find({userID: req.params.userID})) {
                categoryColors.push({
                    categoryID: category["_id"],
                    category: category.category,
                    color: '#000000'
                })
            }
            const chartSettings = new ChartSettings({
                userID: req.params.userID,
                axisScale: 24,
                categoryColors: categoryColors
            });
            await chartSettings.save()
            res.status(200).send(chartSettings);
        } else {
            const userCategories = await Category.find({userID: req.params.userID});

            // Union arrays
            for (const category of userCategories) {
                if (result.categoryColors.find(c => c.categoryID === category["_id"].toString()) === undefined) {
                    result.categoryColors.push({
                        categoryID: category["_id"],
                        category: category.category,
                        color: '#000000'
                    });
                }
            }
            let idsToRemove = [];
            for (const category of result.categoryColors) {
                if (userCategories.find(c => c["_id"].toString() === category.categoryID) === undefined) {
                    idsToRemove.push(category.categoryID);
                }
            }
            result.categoryColors = result.categoryColors.filter(c => !idsToRemove.includes(c.categoryID));

            await result.save();
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