import React from "react";
import { Chip, Typography } from "@material-tailwind/react";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/20/solid";

const TodoDoneNotice = (props) => {
  return (
    <div className="flex align-items-center justify-between mb-3">
      {props.isFinished ? (
        <Chip
          className="normal-case text-sm font-semibold font-sans"
          variant="ghost"
          color="green"
          size="sm"
          value="Done"
          icon={<CheckIcon />}
        />
      ) : (
        <Chip
          className="normal-case text-sm font-semibold font-sans"
          variant="ghost"
          color="cyan"
          size="sm"
          value="Pending"
          icon={
            <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
          }
        />
      )}
    </div>
  );
};

export default TodoDoneNotice;
