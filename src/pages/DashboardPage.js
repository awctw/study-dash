import HabitsView from "../components/Habits/HabitsView";
import TODOListMainView from "../components/TODOList/TODOListMainView";
import Pomodoro from "../components/Timer/Pomodoro";
import GanttChart from "../components/GanttChart";

const DashboardPage = () => {
  return (
    <div className="flex w-3/4 flex-wrap">
      <div>
        <TODOListMainView />
      </div>
      <div className="flex-1 flex justify-end mx-4">
        <Pomodoro />
      </div>
      <div>
        <HabitsView />
      </div>
      <div className="gantt-chart">
        <GanttChart parentElement=".gantt-chart" />
      </div>
    </div>
  );
};

export default DashboardPage;
