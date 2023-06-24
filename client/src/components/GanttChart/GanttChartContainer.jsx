import { Typography } from "@material-tailwind/react";
import GanttChart from "./GanttChart";
import ChartSettingModal from "./ChartSettingModal";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Cog6ToothIcon} from "@heroicons/react/20/solid";

const GanttChartContainer = () => {
    const [visible, setVisible] = useState(false);
    const chartSettings = useSelector((state) => state.chartSettingsReducer.chartSettings);
    const user = useSelector((state) => state.loginReducer);

  return (
    <div className="bg-clip-border rounded-xl bg-white shadow-lg">
      <Typography
        variant="h5"
        className="ml-10 mt-3 mb-3 leading-none tracking-tight dark:text-white"
      >
        Gantt Chart
          {user.isLoggedIn ? <Cog6ToothIcon className="h-5 w-5 float-right mr-5 cursor-pointer" onClick={() => {
            setVisible(true)}}/> : null
          }
      </Typography>
      <div className="gantt-chart">
        <GanttChart />
      </div>
        <ChartSettingModal
            visible={visible}
            setVisible={setVisible}
            chartSettings={chartSettings}
        />
    </div>
  );
};

export default GanttChartContainer;
