import TODOListMainView from "../components/TODOList/TODOListMainView";
import Pomodoro from "../components/Timer/Pomodoro";

const DashboardPage = () => {
  return (
    <div className="flex w-3/4">
      <div>
        <TODOListMainView />
      </div>
      <div className="flex-1 flex justify-end mx-4">
        <Pomodoro />
      </div>
    </div>
  );
};

export default DashboardPage;
