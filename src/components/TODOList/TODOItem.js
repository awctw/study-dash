import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "@material-tailwind/react";
import EditTODO from "./EditTODO";
import { deleteTODO } from "../../store/todoListSlice";

// The TODOItem component represents an individual TODOItem in the list.
const TODOItem = (props) => {
  const dispatch = useDispatch();

  // The handleDelete function is defined using the React.useCallback hook.
  // This ensures that the function reference remains the same unless its dependencies change.
  const handleDelete = React.useCallback(() => {
    dispatch(deleteTODO(props.todo.id));
  }, [dispatch, props.todo.id]);

  return (
    <Card className="p-3 m-3">
      <h3>Title: {props.todo.title}</h3>
      <p>Due Date: {props.todo.dueDate}</p>
      <div id="todoItemButtons">
        <Button
          className="border-indigo-300 bg-white text-indigo-300 border-solid border"
          size="sm"
          onClick={handleDelete}
        >
          Finished
        </Button>
        <EditTODO todo={props.todo} />
      </div>
    </Card>
  );
};

export default TODOItem;
