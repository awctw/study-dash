var express = require("express");
var router = express.Router();
const {
  getTimerSettings,
  putTimerSettings,
} = require("../controllers/timerSettings.controller");

router.get("/:userID", getTimerSettings);

router.put("/", putTimerSettings);

module.exports = router;
