import React from "react";
import TODOListViewer from "./TODOListViewer";
import { useSelector } from "react-redux";
import { Card } from "@material-tailwind/react";

// This TODOListMainView component represents the main view of the TODOlist,
// displaying the list of TODOItems based on the selected category.
const TODOListDashboardView = () => {
  // The useSelector hook extracts the TODOList array from the todoListSlice
  // slice in the rootReducer.
  const { TODOList } = useSelector((state) => state.todoReducer);

  return (
    <Card className="m-4 p-8">
      <TODOListViewer todos={TODOList} />
    </Card>
  );
};

export default TODOListDashboardView;
