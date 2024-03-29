import React from "react";
import TODOListViewer from "./TODOListViewer";
import { Card } from "@material-tailwind/react";
import TODOCalendarView from "./TODOCalendarView";

const TODOListDashboardView = () => {
  return (
    <Card className="flex flex-row justify-evenly m-4 p-4 h-[20rem]">
      <TODOListViewer selectedCategoryID={""} shorten={true} />
      <TODOCalendarView selectedCategoryID={""} />
    </Card>
  );
};

export default TODOListDashboardView;
