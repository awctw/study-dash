import TODOListMainView from "../components/TODOList/TODOListMainView";
import Pomodoro from "../components/Timer/Pomodoro";

const DashboardPage = () => {
  return (
    <div className="flex flex-wrap">
      <div>
        <TODOListMainView />
      </div>
      <div className="m-3">
        <Pomodoro />
      </div>
    </div>
  );
};

export default DashboardPage;
