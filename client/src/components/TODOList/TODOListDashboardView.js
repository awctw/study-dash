import React from "react";
import TODOListViewer from "./TODOListViewer";
import { Card } from "@material-tailwind/react";

const TODOListDashboardView = () => {
  return (
    <Card className="m-4 p-8">
      <TODOListViewer selectedCategoryID={""} />
    </Card>
  );
};

export default TODOListDashboardView;
