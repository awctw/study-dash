import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import EditTODO from "./EditTODO";
import thunk from "../../store/TODOList/thunk";
import TODODoneNotice from "./TODODoneNotice";
import TodoDoneNotice from "./TODODoneNotice";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

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
            <List className="p-0">
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
          </PopoverContent>
        </Popover>
      </div>
      <TodoDoneNotice isFinished={todo.isFinished} />
    </Card>
  );
};

const formatdate = (date) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default TODOItem;
