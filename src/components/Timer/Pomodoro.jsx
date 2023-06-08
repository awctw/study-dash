import {
  Card,
  IconButton,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimerDisplay from "./TimerDisplay";
import useTimer from "../../hooks/useTimer";

// Credits for code snippets: https://github.com/birkaany/pomodoro-app/tree/master
const Pomodoro = () => {
  const { pomodoro, selectedControl, setPomodoro, getRemainingTimePercentage } =
    useTimer();

  const playPauseHandler = () => {
    setPomodoro((prevPomodoro) => {
      return {
        ...prevPomodoro,
        isPaused: !prevPomodoro.isPaused,
      };
    });
  };

  return (
    <Card className="m-3 h-[16rem] w-[16rem] items-center">
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
    </Card>
  );
};

export default Pomodoro;
