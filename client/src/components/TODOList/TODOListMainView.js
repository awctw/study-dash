import React, { useState } from "react";
import TODOListViewer from "./TODOListViewer";
import ControlPanel from "./ControlPanel";
import { Card } from "@material-tailwind/react";

// This TODOListMainView component represents the main view of the TODOlist,
// displaying the list of TODOItems based on the selected category.
const TODOListMainView = () => {
  // The selectedCategoryID state variable keeps track of the currently selected
  // category in the TODOList.
  const [selectedCategoryID, setSelectedCategoryID] = useState("");

  return (
    <>
      <Card className="flex flex-col items-center m-4 p-8 max-w-[50rem]">
        <TODOListViewer selectedCategoryID={selectedCategoryID} />
        <ControlPanel setSelectedCategoryID={setSelectedCategoryID} />
      </Card>
    </>
  );
};

export default TODOListMainView;
