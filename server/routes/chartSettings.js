var express = require('express');
var router = express.Router();
const { getChartSettings, putChartSettings } = require('../controllers/chartSettings.controller');

router.get('/:userEmail', getChartSettings);

router.put('/:userEmail', putChartSettings);

module.exports = router;