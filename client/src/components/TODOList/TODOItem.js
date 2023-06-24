import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Spinner } from "@material-tailwind/react";
import EditTODO from "./EditTODO";
import thunk from "../../store/TODOList/thunk";

// The TODOItem component represents an individual TODOItem in the list.
const TODOItem = ({ todo }) => {
  const dispatch = useDispatch();

  // keeps track of the progress of the delete async operation
  const { deleteTODOItem } = useSelector((state) => state.todoReducer);

  // deletes the current todoItem
  const handleDelete = () => {
    dispatch(thunk.deleteTODOItemAsync(todo.id));
  };

  return (
    <Card className="p-3 m-3">
      <h3>Title: {todo.title}</h3>
      <p>Due Date: {todo.dueDate}</p>
      <div id="todoItemButtons">
        <Button
          className="border-indigo-300 bg-white text-indigo-300 border-solid border"
          size="sm"
          onClick={handleDelete}
        >
          {deleteTODOItem === "PENDING" && <Spinner className="h-10 w-10" />}
          Finished
        </Button>
        <EditTODO todo={todo} />
      </div>
    </Card>
  );
};

export default TODOItem;
