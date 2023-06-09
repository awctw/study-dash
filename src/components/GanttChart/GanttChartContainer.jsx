import { Typography } from "@material-tailwind/react";
import GanttChart from "./GanttChart";

const GanttChartContainer = () => {
  return (
    <div className="bg-clip-border rounded-xl bg-white shadow-lg">
      <Typography
        variant="h5"
        className="ml-10 mt-3 leading-none tracking-tight dark:text-white"
      >
        Gantt Chart
      </Typography>
      <div className="gantt-chart">
        <GanttChart />
      </div>
    </div>
  );
};

export default GanttChartContainer;
