import React from "react";
import AddTODOItem from "./AddNewTODO";
import CategoryToggle from "./CategoryToggle";

// ControlPanel component provides functionalities for clearing all TODOItems,
// adding new TODOItems, and filtering TODOs by category.
const ControlPanel = ({ setSelectedCategory }) => {
  return (
    <div className="flex p-3">
      <AddTODOItem />
      <CategoryToggle handleCategoryChange={setSelectedCategory} />
    </div>
  );
};

export default ControlPanel;
