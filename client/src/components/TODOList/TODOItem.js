import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "@material-tailwind/react";
import EditTODO from "./EditTODO";
import thunk from "../../store/TODOList/thunk";
import TODODoneNotice from "./TODODoneNotice";

// The TODOItem component represents an individual TODOItem in the list.
const TODOItem = ({ todo }) => {
  const dispatch = useDispatch();

  // deletes the current todoItem
  const handleDelete = () => {
    dispatch(thunk.deleteTODOItemAsync(todo._id));
  };

  const endDateObj = new Date(todo.endDate);

  const endDateVal = `${endDateObj.toDateString()}, ${endDateObj.toLocaleTimeString(
    "en-CA"
  )}`;

  return (
    <Card className="flex flex-col justify-evenly p-3 m-3">
      {todo.isFinished && <TODODoneNotice />}
      <h3>
        <strong className="text-black">{todo.title}</strong>
      </h3>
      <p>
        <strong className="text-gray-500">Due:</strong> {endDateVal}
      </p>
      <div className="flex flex-row justify-evenly mt-4 flex-wrap">
        <Button
          className="border-indigo-300 bg-white
          text-indigo-300 border-solid border mb-4"
          size="sm"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <EditTODO todo={todo} />
      </div>
    </Card>
  );
};

export default TODOItem;
