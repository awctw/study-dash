var express = require("express");
var router = express.Router();
const {
  getTimerSettings,
  putTimerSettings,
} = require("../controllers/timerSettings.controller");

router.get("/:_id", getTimerSettings);

router.put("/:_id", putTimerSettings);

module.exports = router;
