import HabitsView from "../components/Habits/HabitsView";
import Pomodoro from "../components/Timer/Pomodoro";
import GanttChartContainer from "../components/GanttChart/GanttChartContainer";
import Overview from "../components/flashcard/flashcardOverview";
import TODOListDashboardView from "../components/TODOList/TODOListDashboardView";

const DashboardPage = () => {
  return (
    <div className="flex flex-wrap">
      <div className="mx-3">
        <TODOListDashboardView />
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
      <div className="mx-7 mt-5">
        <Overview />
      </div>
    </div>
  );
};

export default DashboardPage;
