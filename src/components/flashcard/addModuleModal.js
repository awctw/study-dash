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
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addModule } from "../../store/flashcards/reducer";

const AddModuleModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addModule({ moduleId: uuidv4(), moduleName: name }));
  };

  return (
    <>
      <Button
        color="blue-gray"
        variant="text"
        className="flex items-center h-10 justify-center mx-2 border border-gray-400/70"
        onClick={() => setVisible(true)}
      >
        <PlusIcon className="h-5 w-5 text-center" />
      </Button>
      <Dialog
        open={visible}
        handler={setVisible}
        size="md"
        className="flex flex-row bg-transparent shadow-none items-center justify-center"
      >
        <Card className="relative flex w-2/4 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100">
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
                setVisible(false);
                handleAdd();
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
