import React from "react";
import ListView from "./ListView";

const TODOListViewer = ({ todos }) => {
  const isVisibleTODOListEmpty = () => {
    return todos.length === 0;
  };

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
