import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  IconButton,
  List,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import EditTODO from "./EditTODO";
import thunk from "../../store/TODOList/thunk";
import TodoDoneNotice from "./TODODoneNotice";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/20/solid";

// The TODOItem component represents an individual TODOItem in the list.
const TODOItem = ({ todo, shorten }) => {
  const dispatch = useDispatch();

  // deletes the current todoItem
  const handleDelete = () => {
    dispatch(thunk.deleteTODOItemAsync(todo._id));
  };

  const endDateObj = new Date(todo.endDate);

  const endDateVal = formatdate(endDateObj),
    startDateVal = formatdate(new Date(todo.startDate));

  return (
    <Card
      className={`flex relative flex-col justify-evenly p-3 m-3 ${
        shorten ? "w-[23vw]" : "w-[28vw]"
      }`}
    >
      <Typography variant="h4" className="font-sans text-blue-gray-800">
        {todo.title}
      </Typography>
      <p className="font-sans text-sm text-gray-500">
        {startDateVal} - {endDateVal}
      </p>
      <hr className="my-4 border border-gray-400/25" />
      <div className="absolute top-0 right-0 m-2">
        <Popover>
          <PopoverHandler>
            <IconButton variant="text" color="blue-gray" size="sm">
              <EllipsisVerticalIcon className="text-blue-gray-300 w-5 h-5" />
            </IconButton>
          </PopoverHandler>
          <PopoverContent
            className="flex flex-col items-center
          overflow-y-auto max-h-[15rem]"
          >
            <div className="flex">
              <List className="p-0 min-w-[9rem]">
                <Button
                  variant="text"
                  size="sm"
                  color="red"
                  className="flex text-sm font-sans font-normal normal-case items-center gap-3"
                  onClick={handleDelete}
                >
                  <TrashIcon className="text-red-400 w-4 h-4" />
                  Delete
                </Button>
                <EditTODO todo={todo} />
              </List>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <TodoDoneNotice isFinished={todo.isFinished} />
    </Card>
  );
};

const formatdate = (date) => {
  /**
   * Reference: chatGPT
   */
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedDate = date.toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${formattedHours}:${formattedMinutes}, ${formattedDate}`;
};

export default TODOItem;
