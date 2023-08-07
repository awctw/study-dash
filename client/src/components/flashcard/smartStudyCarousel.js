import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Carousel,
  Chip,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatusBar from "./statusBar";
import Scale from "./answerScale";
import { Player } from "@lottiefiles/react-lottie-player";

const SmartCards = (props) => {
  const flashcards = useSelector((state) => state.flashcards.scheduledCards);

  const numCards = flashcards ? flashcards.length : 0;
  const [flip, setFlip] = useState(false);
  const [answered, setAnswered] = useState([]);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);
  const [allDoneVisible, setAllDoneVisible] = useState(false);

  useEffect(() => {
    if (numCards > 0 && answered.filter(Boolean).length === numCards) {
      setAllDoneVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered]);

  return (
    <>
      <Chip
        className="text-pink-600 mt-2"
        variant="ghost"
        color="pink"
        size="sm"
        value="Smart Study Mode"
        icon={
          <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-pink-600" />
        }
      />
      {flashcards.length > 0 ? (
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
          >
            {flashcards.map((flashcard, i) => (
              <Card
                key={flashcard._id + "-" + i}
                className="w-full h-full object-cover bg-transparent items-center justify-center rounded-none"
              >
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
                        cardId={flashcard._id}
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
          </Carousel>
          <Dialog
            size="xs"
            open={allDoneVisible}
            handler={setAllDoneVisible}
            className="flex flex-col justify-center items-center bg-transparent shadow-none"
          >
            <Player
              onEvent={(event) => {
                if (event === "complete") {
                  setAllDoneVisible(false);
                }
              }}
              src={
                "https://assets3.lottiefiles.com/packages/lf20_eRt4aHeLmL.json"
              }
              style={{ height: "300px", width: "300px", padding: 0 }}
              autoplay
              keepLastFrame
            />
            <Typography
              variant="h3"
              className="font-sans text-white font-light py-0"
            >
              You're All Caught Up!
            </Typography>
          </Dialog>
          <div className="w-full h-[15%] flex justify-center items-center">
            <StatusBar
              setFlip={setFlip}
              flip={flip}
              progress={(answered.filter(Boolean).length / numCards) * 100}
              numCorrect={numCorrect}
              numWrong={numWrong}
              reset={props.reset}
            />
          </div>
        </>
      ) : (
        <Card className="w-full h-full flex items-center justify-center">
          <Player
            src={
              "https://assets3.lottiefiles.com/packages/lf20_eRt4aHeLmL.json"
            }
            style={{ height: "300px", width: "300px", padding: 0 }}
            autoplay
            keepLastFrame
          />
          <Typography className="text-blue-gray-300/70 font-sans text-lg">
            No cards to review. You're all caught up!
          </Typography>
        </Card>
      )}
    </>
  );
};

export default SmartCards;
