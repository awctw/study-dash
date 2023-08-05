import React from "react";
import TODOListViewer from "./TODOListViewer";
import ControlPanel from "./ControlPanel";
import { Card } from "@material-tailwind/react";

// This TODOListMainView component represents the main view of the TODOlist,
// displaying the list of TODOItems based on the selected category.
const TODOListMainView = ({ selectedCategoryID, setSelectedCategoryID }) => {
  return (
    <>
      <Card className="flex flex-col m-4 mt-0 p-8 max-w-[50rem]">
        <TODOListViewer selectedCategoryID={selectedCategoryID} />
        <ControlPanel setSelectedCategoryID={setSelectedCategoryID} />
      </Card>
    </>
  );
};

export default TODOListMainView;
