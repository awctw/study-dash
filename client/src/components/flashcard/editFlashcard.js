import {
  Button,
  Card,
  CardBody,
  Dialog,
  IconButton,
  Input,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editFlashcardAsync } from "../../store/flashcards/thunks";
import DeleteModal from "./confirmDeleteModal";

const EditFlashcard = (props) => {
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [question, setQuestion] = useState(props.question);
  const [answer, setAnswer] = useState(props.answer);

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(
      editFlashcardAsync({
        cardIndex: props.cardIndex,
        moduleId: props.moduleId,
        question: question,
        answer: answer,
      })
    );
  };

  return (
    <>
      <div className="fixed top-0 w-full flex flex-row items-end justify-end">
        <Tooltip content="Edit a Flashcard!" className="z-[99999]">
          <IconButton
            variant="outlined"
            className="rounded-full border border-purple-200/70 mr-2 mt-2 shadow-none"
            color="blue-gray"
            size="sm"
            onClick={() => setVisible(!visible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="rgb(206 147 216)"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete a Flashcard!" className="z-[99999]">
          <IconButton
            variant="outlined"
            className="rounded-full border border-red-400/70 mr-2 mt-2 shadow-none"
            color="blue-gray"
            size="sm"
            onClick={() => setDeleteVisible(!deleteVisible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="rgb(239 83 80)"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </IconButton>
        </Tooltip>
      </div>
      <Dialog
        open={visible}
        handler={setVisible}
        size="sm"
        className="flex flex-row bg-transparent shadow-none items-center justify-center"
      >
        <Card className="relative flex w-2/3 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100">
          <CardBody className="mb-2">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Edit this Flashcard!
            </Typography>
            <Typography className="mb-3">
              You can make any modifications to your flashcard through the
              following inputs.
            </Typography>
            <form className="grid gap-3">
              <Input
                variant="outlined"
                label="Question"
                color="blue-gray"
                className="mb-2"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Textarea
                variant="outlined"
                label="Answer"
                color="blue-gray"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </form>
            <Button
              size="sm"
              variant="text"
              color="blue-gray"
              className="flex items-center mt-3 border border-gray-400/70"
              onClick={() => {
                if (question.length > 0 && answer.length > 0) {
                  handleEdit();
                  setVisible(false);
                }
              }}
            >
              Confirm
            </Button>
          </CardBody>
        </Card>
      </Dialog>
      <DeleteModal
        visible={deleteVisible}
        setVisible={setDeleteVisible}
        object={"flashcard"}
        moduleId={props.moduleId}
        index={props.cardIndex}
      />
    </>
  );
};

export default EditFlashcard;
