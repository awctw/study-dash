import React from "react";
import { Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const TodoDoneNotice = () => {
  return (
    <div className="flex align-items-center justify-between">
      <CheckCircleIcon className="text-indigo-300 mr-4 h-6 mb-4" />
      <Typography variant="h4" className="text-sm text-indigo-300">
        Task Completed
      </Typography>
    </div>
  );
};

export default TodoDoneNotice;
