// Credits for code snippets: https://github.com/birkaany/pomodoro-app/tree/master
const controllers = [
  { label: "pomodoro", value: "pomodoroTime" },
  { label: "short break", value: "shortBreakTime" },
  { label: "long break", value: "longBreakTime" },
];

const useCalculateTime = ({ pomodoro, selectedControl }) => {
  const minutes = Math.floor(pomodoro[controllers[selectedControl].value] / 60);
  const seconds = Math.floor(pomodoro[controllers[selectedControl].value] % 60);
  return { minutes, seconds };
};

export default useCalculateTime;
