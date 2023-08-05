import React, { useState } from "react";
import TODOCalendarView from "./TODOCalendarView";
import { Card } from "@material-tailwind/react";
import TODOListMainView from "./TODOListMainView";

// Represents the main UI of the StudyDash TODOList module
const TodoListModule = () => {
  // The selectedCategoryID state variable keeps track of the currently selected
  // category in the TODOList.
  const [selectedCategoryID, setSelectedCategoryID] = useState("");

  return (
    <Card className="flex flex-row items-start pl-0 shadow-none mt-2">
      <TODOListMainView
        selectedCategoryID={selectedCategoryID}
        setSelectedCategoryID={setSelectedCategoryID}
      />
      <TODOCalendarView selectedCategoryID={selectedCategoryID} />
    </Card>
  );
};

export default TodoListModule;
