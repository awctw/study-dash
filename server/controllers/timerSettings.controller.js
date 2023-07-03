const TimerSettings = require("../models/timerSettings.model");

const getTimerSettings = async (req, res, next) => {
  await TimerSettings.findOne({ userID: req.params.userID })
    .then((result) => {
      if (!result) {
        res.status(200).send({
          userID: req.params.userID,
          pomodoroTime: 25 * 60,
          shortBreakTime: 5 * 60,
          longBreakTime: 15 * 60,
        });
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const putTimerSettings = async (req, res, next) => {
  await TimerSettings.findOneAndUpdate({ userID: req.body.userID }, req.body, {
    new: true,
    upsert: true,
  })
    .then(() => {
      res.status(200).send({
        userID: req.body.userID,
        pomodoroTime: req.body.pomodoroTime,
        shortBreakTime: req.body.shortBreakTime,
        longBreakTime: req.body.longBreakTime,
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
