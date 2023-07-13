import {
  ArrowLongRightIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addModuleAsync } from "../../store/flashcards/thunks";

const AddModuleModal = (props) => {
  const user = useSelector((state) => state.loginReducer);
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addModuleAsync({ moduleName: name, userID: user.user.userID }));
  };

  return (
    <>
      {props.children}
      <Dialog
        open={props.visible}
        handler={props.setVisible}
        size="md"
        className="flex flex-row bg-transparent shadow-none items-center justify-center"
      >
        <Card className="relative flex w-2/4 rounded-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100">
          <CardBody className="mb-2">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Add a Module!
            </Typography>
            <Typography className="mb-3">
              We'll need a concise name for it first! Please enter a module name
              below.
            </Typography>
            <Input
              variant="outlined"
              label="Module Name"
              color="blue-gray"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              size="sm"
              variant="text"
              color="blue-gray"
              className="flex items-center mt-3 border border-gray-400/70"
              onClick={() => {
                if (name.length <= 0) return;
                handleAdd();
                props.setVisible(false);
                if (props.setMainVisible) props.setMainVisible(true);
              }}
            >
              Confirm
            </Button>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
};

export default AddModuleModal;
