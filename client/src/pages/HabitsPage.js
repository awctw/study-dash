import DetailedHabitsView from "../components/Habits/DetailedHabitsView";
import SideBar from "../components/SideBar";
import { Typography } from "@material-tailwind/react";

const HabitsPage = () => {
  return (
  <div>
    <div className="fixed left-0 top-0 z-[1035] h-screen">
      <SideBar />
    </div>
    <div className="p-5 !pl-[300px]">
      <div className="mx-3">
          <Typography variant="h2">Habits</Typography>
      </div>
      <div>
        <DetailedHabitsView />
      </div>
    </div>
  </div>
  );
};

export default HabitsPage;
