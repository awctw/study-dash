import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
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
import { addFlashcard } from "../../store/flashcards/reducer";
import {
  addFlashcardAsync,
  editFlashcardAsync,
} from "../../store/flashcards/thunks";

const EditFlashcard = (props) => {
  const [visible, setVisible] = useState(false);
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
      <div className="fixed top-0 w-full flex items-end justify-end">
        <Tooltip content="Edit a Flashcard!" className="z-[99999]">
          <IconButton
            variant="outlined"
            className="rounded-full border border-gray-400/60 mr-2 mt-2 shadow-none"
            color="blue-gray"
            size="sm"
            onClick={() => setVisible(!visible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgba(158, 158, 158, 0.9)"
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
    </>
  );
};

export default EditFlashcard;
