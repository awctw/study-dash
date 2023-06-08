import React from "react";
import { Typography } from "@material-tailwind/react";
import ListView from "./ListView";

const TODOListViewer = ({ todos }) => {
  // isVisibleTODOListEmpty checks if the todos array is empty.
  const isVisibleTODOListEmpty = () => {
    return todos.length === 0;
  };

  // Only render the ListView if the isVisibleTODOListEmpty function returns false,
  // indicating that there are visible TODOItems to display.
  return (
    <div className="border-black border-solid border-2 p-3 rounded-2xl">
      <header className="flex justify-between">
        <Typography variant="h5">TODO List</Typography>
        <Typography variant="small">Total Todos: {todos.length}</Typography>
      </header>
      {!isVisibleTODOListEmpty() && <ListView visibleTODOs={todos} />}
    </div>
  );
};

export default TODOListViewer;
