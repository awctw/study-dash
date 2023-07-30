import {
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Chip,
  Navbar,
  Progress,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const StatusBar = (props) => {
  const navList = (
    <div className="w-full">
      <div className="flex items-center justify-between gap-10">
        <Typography variant="small" color="gray">
          progress
        </Typography>
        <Typography variant="small" color="gray">
          {props.progress ? props.progress.toFixed(1) : 0}%
        </Typography>
      </div>
      <Progress value={props.progress} size="sm" color="blue-gray" />
    </div>
  );
  return (
    <Navbar className="mx-2 mb-1 py-2 px-4 border border-gray-400/70">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="w-2/5 hidden lg:block">{navList}</div>
        <div className="flex flex-row">
          <Chip
            className="mx-1"
            variant="ghost"
            color="green"
            size="sm"
            value={props.numCorrect}
            icon={<CheckIcon color="green" />}
          />
          <Chip
            variant="ghost"
            color="red"
            size="sm"
            value={props.numWrong}
            icon={<XMarkIcon color="red" />}
          />
        </div>
        <Button
          size="sm"
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={() => {
            props.setFlip(!props.flip);
          }}
        >
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          Check Answer
        </Button>
        <Button
          size="sm"
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={props.reset}
        >
          <ArrowPathIcon className="h-5 w-5" />
          reset
        </Button>
      </div>
    </Navbar>
  );
};

export default StatusBar;
