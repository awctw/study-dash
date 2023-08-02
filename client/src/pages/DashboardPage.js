import HabitsView from "../components/Habits/HabitsView";
import Pomodoro from "../components/Timer/Pomodoro";
import { Typography } from "@material-tailwind/react";
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
    if (user.isLoggedIn) {
      dispatch(getModulesAsync(user.user.userID));
    }
  }, [dispatch, user]);

  return (
    <div>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="p-5 !pl-[300px]">
        <div className="flex flex-wrap mx-5">
          <div className="">
            <Typography variant="h2">Dashboard</Typography>
          </div>
          <div className="flex flex-row items-center justify-evenly flex-grow">
            <div className="">
              <TODOListDashboardView className="" />
            </div>
            <div className="">
              <Pomodoro className="" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-evenly flex-grow">
            <div className="">
              <HabitsView />
            </div>
            <div className="">
              <GanttChartContainer className="" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-evenly flex-grow">
            <div className="mt-5">
              <Overview />
            </div>
          </div>
        </div>
        {!user.isLoggedIn && <Navigate to="/" replace={true} />}
      </div>
    </div>
  );
};

export default DashboardPage;
