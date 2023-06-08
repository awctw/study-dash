import React from "react";
import ListView from "./ListView";

const TODOListViewer = ({ todos }) => {
  // isVisibleTODOListEmpty checks if the todos array is empty.
  const isVisibleTODOListEmpty = () => {
    return todos.length === 0;
  };

  // Only render the ListView if the isVisibleTODOListEmpty function returns false,
  // indicating that there are visible TODOItems to display.
  return (
    <div className="TODOListViewer">
      <header id="TODOListViewerHeader">
        <h1 id="TODOListViewerHeaderTitle">TODO List</h1>
        <p>Total Todos: {todos.length}</p>
      </header>
      {!isVisibleTODOListEmpty() && <ListView visibleTODOs={todos} />}
    </div>
  );
};

export default TODOListViewer;
