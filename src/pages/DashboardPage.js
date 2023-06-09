import HabitsView from "../components/Habits/HabitsView";
import TODOListMainView from "../components/TODOList/TODOListMainView";
import Pomodoro from "../components/Timer/Pomodoro";
import GanttChartContainer from "../components/GanttChart/GanttChartContainer";

const DashboardPage = () => {
  return (
    <div className="flex flex-wrap">
      <div>
        <TODOListMainView />
      </div>
      <div className="mx-3">
        <Pomodoro />
      </div>
      <div className="mx-7">
        <HabitsView />
      </div>
      <div className="mx-2">
        <GanttChartContainer />
      </div>
    </div>
  );
};

export default DashboardPage;
