import React from "react";
import { Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const TodoDoneNotice = () => {
  return (
    <div className="flex flex-row justify-start h-6 mb-4">
      <CheckCircleIcon className="mr-4" />
      <Typography variant="h4" color="green" className="text-sm">
        Task Completed
      </Typography>
    </div>
  );
};

export default TodoDoneNotice;
