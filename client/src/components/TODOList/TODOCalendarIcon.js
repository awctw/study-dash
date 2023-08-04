import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import TODOItem from "./TODOItem";

// Creates an icon within the current "Date" tile to show the presence of
// TODOItems starting at that date. Clicking the icon will show a popover
// list of all the TODOItems for that "Date" tile
const TODOCalendarIcon = ({ TODOList }) => {
  // If TODOList contains at least one non-finished TODOItem,
  // the icon applied to the current date tile will be red.
  // If TODOList contains zero non-finished TODOItems, the icon
  // applied to the current date tile will be grey.
  const configureTODOIconColour = () => {
    const notFinishedTODOs = TODOList.filter((todo) => {
      return todo.isFinished === false;
    });

    if (notFinishedTODOs.length > 0) {
      return "fill-red-500";
    }

    return "fill-gray-400";
  };

  return (
    <Popover>
      <PopoverHandler>
        <ExclamationCircleIcon className={configureTODOIconColour()} />
      </PopoverHandler>
      <PopoverContent
        className="flex flex-col items-center
      overflow-y-auto max-h-[15rem] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-gray-100/50"
      >
        {TODOList.map((todo) => (
          <TODOItem key={todo._id} todo={todo} shorten={true} />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default TODOCalendarIcon;
