import { Card, IconButton } from "@material-tailwind/react";
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
    <Card className="mt-7 h-[25rem] w-[25rem] items-center">
      <div className="w-[20rem] h-[20rem] flex justify-center items-center rounded-full bg-gradient-to-t to-pmd-blue-600 from-pmd-blue-900  shadow-2xl shadow-pmd-blue-600">
        <div className="w-[17rem] h-[17rem] flex justify-center items-center rounded-full text-6xl bg-pmd-blue-900">
          <div className="flex flex-col justify-center items-center font-semibold relative">
            <CircularProgressbarWithChildren
              strokeWidth={2}
              trailColor="transparent"
              value={getRemainingTimePercentage()}
              styles={buildStyles({
                trailColor: "transparent",
                pathColor: "black",
              })}
            >
              <TimerDisplay
                pomodoro={pomodoro}
                selectedControl={selectedControl}
              />
              <IconButton
                className="mt-4"
                color="gray"
                onClick={playPauseHandler}
              >
                {pomodoro.isPaused ? (
                  <PlayIcon className="h-5 w-5" />
                ) : (
                  <PauseIcon className="h-5 w-5" />
                )}
              </IconButton>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Pomodoro;
