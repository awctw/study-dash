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
    <div className="bg-clip-border rounded-xl bg-white shadow-lg min-h-[17rem]">
      <div className="p-3 pb-0">
        <Typography
          variant="h5"
          className="leading-none tracking-tight dark:text-white"
        >
          Gantt Chart
          {user.isLoggedIn && chartSettings !== null ? (
            <Cog6ToothIcon
              className="h-5 w-5 float-right cursor-pointer"
              onClick={() => {
                setVisible(true);
              }}
            />
          ) : null}
        </Typography>
      </div>
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
