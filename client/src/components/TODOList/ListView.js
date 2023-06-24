import React from "react";
import TodoItem from "./TODOItem";

// The ListView component is responsible for rendering the list of visible TODOitems.
const ListView = ({ visibleTODOs }) => {
  return (
    <div className="list-view">
      {visibleTODOs.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default ListView;
