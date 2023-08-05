import React from "react";
import TodoItem from "./TODOItem";
import { useSelector } from "react-redux";

// The ListView component is responsible for rendering the list of visible TODOitems.
const ListView = (props) => {
  const { TODOList } = useSelector((state) => state.todoReducer);
  return (
    <div className="flex flex-col items-center max-h-[58vh] overflow-y-auto scrollbar-none rounded-[30px] p-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-gray-100/50">
      {TODOList.map((todo) => (
        <TodoItem key={todo._id} todo={todo} shorten={props.shorten} />
      ))}
    </div>
  );
};

export default ListView;
