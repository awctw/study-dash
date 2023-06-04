import useCalculateTime from "../../hooks/useCalculateTime";

// Credits for code snippets: https://github.com/birkaany/pomodoro-app/tree/master
const TimerDisplay = ({ pomodoro, selectedControl }) => {
  const { minutes, seconds } = useCalculateTime({ pomodoro, selectedControl });

  return (
    <>
      {minutes < 9 ? "0" : ""}
      {minutes}:{seconds < 9 ? "0" : ""}
      {seconds}
    </>
  );
};

export default TimerDisplay;
