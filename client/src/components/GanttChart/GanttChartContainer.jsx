import { Typography } from "@material-tailwind/react";
import GanttChart from "./GanttChart";
import ChartSettingsModal from "./ChartSettingsModal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";

const GanttChartContainer = () => {
  const [visible, setVisible] = useState(false);
  const chartSettings = useSelector(
    (state) => state.chartSettingsReducer.chartSettings
  );
  const user = useSelector((state) => state.loginReducer);

  return (
    <div className="bg-clip-border rounded-xl bg-white shadow-lg h-[17rem]">
      <Typography
        variant="h5"
        className="pl-5 pt-3 pb-2 leading-none tracking-tight dark:text-white"
      >
        Gantt Chart
        {user.isLoggedIn && chartSettings !== null ? (
          <Cog6ToothIcon
            className="h-5 w-5 float-right mr-5 cursor-pointer"
            onClick={() => {
              setVisible(true);
            }}
          />
        ) : null}
      </Typography>
      <div className="gantt-chart">
        <GanttChart />
      </div>
      {user.isLoggedIn && chartSettings !== null ? (
        <ChartSettingsModal
          visible={visible}
          setVisible={setVisible}
          chartSettings={chartSettings}
        />
      ) : null}
    </div>
  );
};

export default GanttChartContainer;
