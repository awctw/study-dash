import React from "react";
import { Typography } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const TodoDoneNotice = () => {
  return (
    <div className="todoDoneMessage">
      <CheckCircleIcon className="mr-4" />
      <Typography variant="h4" color="green" className="text-sm">
        Task Completed
      </Typography>
    </div>
  );
};

export default TodoDoneNotice;
