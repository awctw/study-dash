import React, { useState } from "react";
import TODOListViewer from "./TODOListViewer";
import ControlPanel from "./ControlPanel";
import { useSelector } from "react-redux";

// This TODOListMainView component represents the main view of the TODOlist,
// displaying the list of TODOItems based on the selected category.
const TODOListMainView = () => {
  // The useSelector hook extracts the TODOList array from the todoListSlice
  // slice in the rootReducer.
  const { TODOList } = useSelector((state) => state.todoReducer);

  // The selectedCategory state variable keeps track of the currently selected
  // category in the TODOList.
  const [selectedCategory, setSelectedCategory] = useState("");

  // The getVisibleTODOs function is defined to filter the TODOList based on the selected category.
  const getVisibleTODOs = () => {
    if (!selectedCategory) {
      return TODOList;
    }
    return TODOList.filter((todo) => todo.category === selectedCategory);
  };

  return (
    <div className="bg-fdf5f0 flex flex-row justify-evenly items-center p-8 rounded-2xl">
      <TODOListViewer todos={getVisibleTODOs()} />
      <ControlPanel setSelectedCategory={setSelectedCategory} />
    </div>
  );
};

export default TODOListMainView;