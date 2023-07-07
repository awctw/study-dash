import React from "react";
import AddTODOItem from "./AddNewTODO";
import CategoryToggle from "./CategoryToggle";

// ControlPanel component provides functionalities for clearing all TODOItems,
// adding new TODOItems, and filtering TODOs by category.
const ControlPanel = ({ setSelectedCategoryID }) => {
  return (
    <div className="flex p-3">
      <AddTODOItem />
      <CategoryToggle setSelectedCategoryID={setSelectedCategoryID} />
    </div>
  );
};

export default ControlPanel;
