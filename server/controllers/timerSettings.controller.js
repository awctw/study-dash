const TimerSettings = require("../models/timerSettings.model");

const defaultTimerSettings = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
};

const getTimerSettings = async (req, res, next) => {
  await TimerSettings.findOne({ _id: req.params._id })
    .then((result) => {
      if (!result) {
        res.status(200).send(defaultTimerSettings);
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const putTimerSettings = async (req, res, next) => {
  await TimerSettings.findOneAndUpdate({ _id: req.params._id }, req.body, {
    new: true,
    upsert: true,
  })
    .then((result) => {
      res.status(200).send({
        pomodoroTime: result.pomodoroTime,
        shortBreakTime: result.shortBreakTime,
        longBreakTime: result.longBreakTime,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getTimerSettings,
  putTimerSettings,
};
