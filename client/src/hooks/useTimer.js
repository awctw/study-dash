import { useEffect, useState, useRef } from "react";

// Credits for code snippets: https://github.com/birkaany/pomodoro-app/tree/master
const controllers = [
  { label: "pomodoro", value: "pomodoroTime" },
  { label: "short break", value: "shortBreakTime" },
  { label: "long break", value: "longBreakTime" },
];

const stages = {
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
  totalTimes: [25 * 60, 5 * 60, 15 * 60],
  isPaused: true,
  period: 1,
  cycle: 0,
};

const useTimer = () => {
  const [selectedControl, setSelectedControl] = useState(0);
  const [pomodoro, setPomodoro] = useState(stages);
  const periodId = useRef(stages.period);

  const resetTimerValues = () => {
    setPomodoro((prevPomodoro) => {
      const controlValue = controllers[selectedControl].value;
      console.log(stages[controlValue]);
      return {
        ...prevPomodoro,
        [controlValue]: pomodoro.totalTimes[selectedControl],
      };
    });
  };

  const getRemainingTimePercentage = () => {
    const totalTime = pomodoro.totalTimes[selectedControl];
    const remainingTime = pomodoro[controllers[selectedControl].value];
    return (remainingTime / totalTime) * 100;
  };

  useEffect(() => {
    let timer = null;
    if (!pomodoro.isPaused) {
      timer = setInterval(() => {
        setPomodoro((prevPomodoro) => {
          if (prevPomodoro[controllers[selectedControl].value] === 0) {
            setSelectedControl((prevState) => {
              if (periodId.current === 15) {
                prevPomodoro.cycle += 1;
                periodId.current = -1;
                return 2;
              } else if (prevState === 0) {
                return 1;
              }
              return 0;
            });

            resetTimerValues();
            clearInterval(timer);
            periodId.current += 1;

            return prevPomodoro;
          }
          return {
            ...prevPomodoro,
            [controllers[selectedControl].value]:
              prevPomodoro[controllers[selectedControl].value] - 1,
          };
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });

  return {
    pomodoro,
    setPomodoro,
    selectedControl,
    setSelectedControl,
    resetTimerValues,
    getRemainingTimePercentage,
  };
};

export default useTimer;
