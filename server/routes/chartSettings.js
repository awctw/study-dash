var express = require('express');
var router = express.Router();
const { getChartSettings, putChartSettings } = require('../controllers/chartSettings.controller');

router.get('/:userID', getChartSettings);

router.put('/:userID', putChartSettings);

module.exports = router;