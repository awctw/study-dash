import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFlashcardAsync,
  deleteModuleAsync,
  editFlashcardAsync,
} from "../../store/flashcards/thunks";
import { nanoid } from "@reduxjs/toolkit";

const DeleteModal = (props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (props.object === "flashcard") {
      dispatch(
        deleteFlashcardAsync({
          moduleId: props.moduleId,
          index: props.index,
        })
      );
    } else if (props.object === "module") {
      props.setId(null);
      dispatch(deleteModuleAsync(props.moduleId));
    }
  };

  return (
    <>
      <Dialog
        open={props.visible}
        handler={props.setVisible}
        size="sm"
        className="flex flex-row bg-transparent shadow-none items-center justify-center"
      >
        <Card className="relative flex w-2/3 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100">
          <DialogHeader>
            <Typography variant="h5" color="blue-gray">
              Delete this {props.object}?
            </Typography>
          </DialogHeader>
          <DialogBody divider>
            <Typography>
              Are you sure you want to delete this {props.object}? This action
              is irreversible.
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              size="sm"
              variant="text"
              color="blue-gray"
              className="flex items-center border border-gray-400/70"
              onClick={() => {
                handleDelete();
                props.setVisible(false);
              }}
            >
              Confirm
            </Button>
            <Button
              size="sm"
              variant="text"
              color="blue-gray"
              className="flex items-center ml-1 border border-gray-400/70"
              onClick={() => {
                props.setVisible(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default DeleteModal;
