import HabitsView from "../components/Habits/HabitsView";
import Pomodoro from "../components/Timer/Pomodoro";
import GanttChartContainer from "../components/GanttChart/GanttChartContainer";
import SideBar from "../components/SideBar";
import Overview from "../components/flashcard/flashcardOverview";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModulesAsync } from "../store/flashcards/thunks";
import { Navigate } from "react-router-dom";
import TODOListDashboardView from "../components/TODOList/TODOListDashboardView";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginReducer);

  useEffect(() => {
    dispatch(getModulesAsync(user.user.userID));
  }, []);

  return (
    <div>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="p-5 !pl-[300px]">
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
        {!user.isLoggedIn && <Navigate to="/" replace={true} />}
      </div>
    </div>
  );
};

export default DashboardPage;
