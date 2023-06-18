import { PlusCircleIcon } from "@heroicons/react/24/outline";
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
import { addFlashcardAsync } from "../../store/flashcards/thunks";

const AddFlashcard = (props) => {
  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    // Can only pass one argument to a thunk! ¯\_(ツ)_/¯
    dispatch(
      addFlashcardAsync({
        moduleId: props.moduleId,
        question: question,
        answer: answer,
      })
    );
  };

  return (
    <>
      <Card className="w-full h-full object-cover bg-transparent items-center justify-center rounded-none">
        <div
          className={`card flex bg-transparent rounded-3xl shadow-lg border border-gray-400/70 items-center justify-center`}
        >
          <Tooltip content="Add a Flashcard!" className="z-[99999]">
            <Button
              color="blue-gray"
              variant="text"
              size="sm"
              className="bg-transparent rounded-full active:bg-transparent p-0"
              onClick={() => setVisible(!visible)}
            >
              <PlusCircleIcon
                strokeWidth={0.7}
                className="w-16 h-16 text-gray-400/70"
              />
            </Button>
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
                Add a Flashcard!
              </Typography>
              <Typography className="mb-3">
                Please enter a question and answer that will be associated with
                this flashcard.
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
                    setVisible(false);
                    handleAdd();
                  }
                }}
              >
                Confirm
              </Button>
            </CardBody>
          </Card>
        </Dialog>
      </Card>
    </>
  );
};

export default AddFlashcard;
