import React from "react";
import TodoItem from "./TODOItem";
import { useSelector } from "react-redux";

// The ListView component is responsible for rendering the list of visible TODOitems.
const ListView = () => {
  const { TODOList } = useSelector((state) => state.todoReducer);
  return (
    <div className="list-view">
      {TODOList.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default ListView;
