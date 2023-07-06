import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Carousel,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatusBar from "./statusBar";
import AddFlashcard from "./addFlashcard";
import EditFlashcard from "./editFlashcard";
import Scale from "./answerScale";

const Cards = (props) => {
  const module = useSelector((state) =>
    state.flashcards.modules.find((module) => module._id === props.moduleId)
  );

  const numCards = module ? module.flashcards.length : 0;
  const [flip, setFlip] = useState(false);
  const [answered, setAnswered] = useState([]);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);

  return (
    <>
      <Carousel
        className="bg-transparent h-[85%] w-full"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i
                    ? "bg-blue-gray-700 w-8"
                    : "bg-blue-gray-400/50 w-4"
                }`}
                onClick={() => {
                  setFlip(false);
                  setActiveIndex(i);
                }}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="blue-gray"
            size="lg"
            onClick={() => {
              setFlip(false);
              handlePrev();
            }}
            className="!absolute top-2/4 -translate-y-2/4 left-4"
          >
            <ChevronLeftIcon strokeWidth={2} className="w-6 h-6" />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="blue-gray"
            size="lg"
            onClick={() => {
              setFlip(false);
              handleNext();
            }}
            className="!absolute top-2/4 -translate-y-2/4 !right-4"
          >
            <ChevronRightIcon strokeWidth={2} className="w-6 h-6" />
          </IconButton>
        )}
        // Need to change next arrow so that it can be disabled
      >
        {module &&
          module.flashcards.map((flashcard, i) => (
            <Card
              key={module._id + "-" + i}
              className="w-full h-full object-cover bg-transparent items-center justify-center rounded-none"
            >
              {/* <Typography key={i} variant="h2" className="text-gray-50 mx-28 text-center">{question}</Typography> */}
              <div
                className={`card ${
                  flip ? "flipped" : ""
                } bg-purple-theme rounded-3xl shadow-lg relative`}
              >
                <div className="front items-center justify-center">
                  <Typography
                    variant="h2"
                    className="text-gray-50 mx-28 text-center"
                  >
                    {flashcard.question}
                  </Typography>
                  <EditFlashcard
                    moduleId={module._id}
                    question={flashcard.question}
                    answer={flashcard.answer}
                    cardIndex={i}
                  />
                </div>
                <div className="back items-center justify-center relative">
                  <Typography
                    variant="h4"
                    className="text-gray-50 mx-28 text-center"
                  >
                    {flashcard.answer}
                  </Typography>
                  <div className="absolute flex bottom-0 w-full">
                    <Scale
                      disabled={answered[i]}
                      setAnswered={setAnswered}
                      cardIndex={i}
                      setNumCorrect={setNumCorrect}
                      setNumWrong={setNumWrong}
                      setFlip={setFlip}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        <AddFlashcard moduleId={module._id} />
      </Carousel>
      <div className="w-full h-[15%] flex justify-center items-center">
        <StatusBar
          setFlip={setFlip}
          flip={flip}
          // note: .filter(Boolean) keeps every truthy value in the array!
          progress={(answered.filter(Boolean).length / numCards) * 100}
          numCorrect={numCorrect}
          numWrong={numWrong}
          reset={props.reset}
        />
      </div>
    </>
  );
};

export default Cards;
