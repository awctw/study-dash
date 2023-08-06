import {
  Card,
  IconButton,
  CardBody,
  Typography,
  Dialog,
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimerDisplay from "./TimerDisplay";
import useTimer from "../../hooks/useTimer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTimerSettingsAsync,
  putTimerSettingsAsync,
} from "../../store/timerSettings/thunks";

// Credits for code snippets: https://github.com/birkaany/pomodoro-app/tree/master
const Pomodoro = () => {
  const user = useSelector((state) => state.loginReducer);
  const timerSettings = useSelector(
    (state) => state.timerSettingsReducer.timerSettings
  );
  const dispatch = useDispatch();

  const { pomodoro, selectedControl, setPomodoro, getRemainingTimePercentage } =
    useTimer();
  const [open, setOpen] = useState(false);
  const [customPomodoro, setCustomPomodoro] = useState(
    timerSettings.pomodoroTime / 60
  );
  const [customShortBreak, setCustomShortBreak] = useState(
    timerSettings.shortBreakTime / 60
  );
  const [customLongBreak, setCustomLongBreak] = useState(
    timerSettings.longBreakTime / 60
  );

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(getTimerSettingsAsync(user.user.userID));
    }
  }, [dispatch, user]);

  const handlePut = () => {
    const customTimes = {
      userID: user.user.userID,
      pomodoroTime: customPomodoro * 60,
      shortBreakTime: customShortBreak * 60,
      longBreakTime: customLongBreak * 60,
    };
    dispatch(putTimerSettingsAsync(customTimes));
  };

  useEffect(() => {
    setCustomPomodoro(timerSettings.pomodoroTime / 60);
    setCustomShortBreak(timerSettings.shortBreakTime / 60);
    setCustomLongBreak(timerSettings.longBreakTime / 60);

    setPomodoro({
      pomodoroTime: timerSettings.pomodoroTime,
      shortBreakTime: timerSettings.shortBreakTime,
      longBreakTime: timerSettings.longBreakTime,
      totalTimes: [
        timerSettings.pomodoroTime,
        timerSettings.shortBreakTime,
        timerSettings.longBreakTime,
      ],
      isPaused: true,
      period: 1,
      cycle: 0,
    });
  }, [setPomodoro, timerSettings]);

  const handleCustomPomodoro = (event) => {
    setCustomPomodoro(event.target.value);
  };

  const handleCustomShortBreak = (event) => {
    setCustomShortBreak(event.target.value);
  };

  const handleCustomLongBreak = (event) => {
    setCustomLongBreak(event.target.value);
  };

  const playPauseHandler = () => {
    setPomodoro((prevPomodoro) => {
      return {
        ...prevPomodoro,
        isPaused: !prevPomodoro.isPaused,
      };
    });
  };

  const handleOpen = () => setOpen(!open);

  const onApply = () => {
    setOpen(!open);
    setPomodoro({
      pomodoroTime: customPomodoro * 60,
      shortBreakTime: customShortBreak * 60,
      longBreakTime: customLongBreak * 60,
      totalTimes: [
        customPomodoro * 60,
        customShortBreak * 60,
        customLongBreak * 60,
      ],
      isPaused: true,
      period: 1,
      cycle: 0,
    });
    handlePut();
  };

  return (
    <Card className="m-3 p-5 items-center h-[20rem]">
      <div className="absolute top-0 right-0">
        <Cog6ToothIcon
          className="h-5 w-5 cursor-pointer float-right m-2"
          color="black"
          onClick={handleOpen}
        />
      </div>
      <div className="w-[12rem] h-[12rem] flex justify-center items-center rounded-full bg-gradient-to-t to-pmd-blue-600 from-pmd-blue-900 shadow-2xl shadow-pmd-blue-600">
        <div className="w-[9rem] h-[9rem] flex justify-center items-center rounded-full text-3xl bg-pmd-blue-900">
          <div className="flex flex-col justify-center items-center font-semibold relative">
            <CircularProgressbarWithChildren
              strokeWidth={2}
              trailColor="transparent"
              value={getRemainingTimePercentage()}
              styles={buildStyles({
                trailColor: "transparent",
                pathColor: "#7986cb",
              })}
            >
              <TimerDisplay
                pomodoro={pomodoro}
                selectedControl={selectedControl}
              />
              <IconButton
                className="mt-2 h-7 w-7 bg-indigo-300"
                color="gray"
                onClick={playPauseHandler}
              >
                {pomodoro.isPaused ? (
                  <PlayIcon className="h-3 w-3" />
                ) : (
                  <PauseIcon className="h-3 w-3" />
                )}
              </IconButton>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
      <CardBody className="text-center">
        <Typography variant="h6">
          {selectedControl === 1
            ? "Short Break"
            : selectedControl === 2
            ? "Long Break"
            : "Focus"}
        </Typography>
      </CardBody>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Settings</DialogHeader>
        <DialogBody divider>
          <Typography variant="h6">Time (Minutes)</Typography>
          <div className="flex flex-row gap-6">
            <Input
              containerProps={{ className: "min-w-[72px]" }}
              type="number"
              label="Pomodoro"
              value={customPomodoro}
              onChange={handleCustomPomodoro}
            />
            <Input
              containerProps={{ className: "min-w-[72px]" }}
              type="number"
              label="Short Break"
              value={customShortBreak}
              onChange={handleCustomShortBreak}
            />
            <Input
              containerProps={{ className: "min-w-[72px]" }}
              type="number"
              label="Long Break"
              value={customLongBreak}
              onChange={handleCustomLongBreak}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={handleOpen}
            className="border-indigo-300 bg-white text-indigo-300 border-solid border m-2"
          >
            <span>Cancel</span>
          </Button>
          <Button className="bg-indigo-300 text-white m-2" onClick={onApply}>
            <span>Apply</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default Pomodoro;
