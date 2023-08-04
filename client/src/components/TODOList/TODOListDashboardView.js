import React from "react";
import TODOListViewer from "./TODOListViewer";
import { Card } from "@material-tailwind/react";
import TODOCalendarView from "./TODOCalendarView";

const TODOListDashboardView = () => {
  return (
    <Card className="flex flex-row justify-evenly h-[19rem]">
      <TODOListViewer selectedCategoryID={""} />
      <div className="flex items-center">
        <TODOCalendarView selectedCategoryID={""} />
      </div>
    </Card>
  );
};

export default TODOListDashboardView;
