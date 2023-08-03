import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Spinner } from "@material-tailwind/react";
import EditTODO from "./EditTODO";
import thunk from "../../store/TODOList/thunk";
import { REQUEST_STATE } from "../../store/utils";
import TODODoneNotice from "./TODODoneNotice";

// The TODOItem component represents an individual TODOItem in the list.
const TODOItem = ({ todo }) => {
  const dispatch = useDispatch();

  // keeps track of the progress of the delete async operation
  const { deleteTODOItem } = useSelector((state) => state.todoReducer);

  // deletes the current todoItem
  const handleDelete = () => {
    dispatch(thunk.deleteTODOItemAsync(todo._id));
  };

  const startDateObj = new Date(todo.startDate);
  const endDateObj = new Date(todo.endDate);

  const startDateVal = `${startDateObj.toDateString()}, ${startDateObj.toLocaleTimeString(
    "en-CA",
    {
      // Add options to omit seconds component from time string
      hour: "numeric",
      minute: "numeric",
    }
  )}`;

  const endDateVal = `${endDateObj.toDateString()}, ${endDateObj.toLocaleTimeString(
    "en-CA",
    {
      // Add options to omit seconds component from time string
      hour: "numeric",
      minute: "numeric",
    }
  )}`;

  return (
    <Card className="flex flex-col justify-evenly p-3 m-3">
      {todo.isFinished && <TODODoneNotice />}
      <h3>
        <strong className="text-light-blue-200">Title:</strong> {todo.title}
      </h3>
      <p>
        <strong className="text-red-400">Start Date:</strong> {startDateVal}
      </p>
      <p>
        <strong className="text-red-400">End Date:</strong> {endDateVal}
      </p>
      <div className="flex flex-row justify-evenly mt-4 flex-wrap">
        <Button
          className="border-indigo-300 bg-white
          text-indigo-300 border-solid border mb-4"
          size="sm"
          onClick={handleDelete}
        >
          {deleteTODOItem === REQUEST_STATE.PENDING && (
            <Spinner className="h-10 w-10" />
          )}
          Delete
        </Button>
        <EditTODO todo={todo} />
      </div>
    </Card>
  );
};

export default TODOItem;
