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
  return (
    <Popover>
      <PopoverHandler>
        <ExclamationCircleIcon className="fill-red-500" />
      </PopoverHandler>
      <PopoverContent
        className="flex flex-col items-center
      overflow-y-auto h-[15rem]"
      >
        {TODOList.map((todo) => (
          <TODOItem key={todo._id} todo={todo} />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default TODOCalendarIcon;
