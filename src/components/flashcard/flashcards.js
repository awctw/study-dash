import { ArrowLeftIcon, ArrowPathRoundedSquareIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Card, Carousel, IconButton, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatusBar from "./statusBar";
import AddFlashcard from "./addFlashcard";

const Cards = (props) => {
    const module = useSelector(state => state.flashcards.modules.find(module => module.id === props.moduleId));
    const numCards = module.questions.length;
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
                                activeIndex === i ? "bg-blue-gray-700 w-8" : "bg-blue-gray-400/50 w-4"
                            }`}
                            onClick={() => {
                                setFlip(false)
                                setActiveIndex(i)
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
                {
                    module.questions.map((question, i) => (
                        <>
                            <Card key={i} className="w-full h-full object-cover bg-transparent items-center justify-center rounded-none">
                                {/* <Typography key={i} variant="h2" className="text-gray-50 mx-28 text-center">{question}</Typography> */}
                                <div className={`card ${flip ? 'flipped' : ''} bg-purple-theme rounded-3xl shadow-lg`}>
                                    <div className="front items-center justify-center">
                                        <Typography variant="h2" className="text-gray-50 mx-28 text-center">{question}</Typography>
                                    </div>
                                    <div className="back items-center justify-center relative">
                                        <Typography variant="h4" className="text-gray-50 mx-28 text-center">{module.answers[i]}</Typography>
                                        <div className="absolute justify-between flex bottom-0 left-0 right-0">
                                            <IconButton 
                                                disabled={answered[i]}
                                                size="md" className="rounded-xl bg-transparent mx-3 my-3 border border-green-400 hover:shadow-none shadow-none"
                                                onClick={() => {
                                                    setAnswered((prevArray) => {
                                                        const newArr = [...prevArray];
                                                        newArr[i] = true;
                                                        return newArr;
                                                    });
                                                    setNumCorrect(numCorrect => numCorrect + 1);
                                                    setFlip(false);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-green-400 w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </IconButton>
                                            <IconButton 
                                                disabled={answered[i]}
                                                size="md" className="rounded-xl bg-transparent mx-3 my-3 border border-red-500 hover:shadow-none shadow-none"
                                                onClick={() => {
                                                    setAnswered((prevArray) => {
                                                        const newArr = [...prevArray];
                                                        newArr[i] = true;
                                                        return newArr;
                                                    });
                                                    setNumWrong(numWrong => numWrong + 1);
                                                    setFlip(false);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-500 w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </>
                    ))
                }
                <AddFlashcard />
            </Carousel>
            <div className="w-full h-[15%] flex justify-center items-center">
                <StatusBar 
                    setFlip={setFlip}
                    flip={flip} 
                    // note: .filter(Boolean) keeps every truthy value in the array!
                    progress={((answered.filter(Boolean).length)/numCards)*100 } 
                    numCorrect={numCorrect}
                    numWrong={numWrong}
                    reset={props.reset}
                />
            </div>
        </>
    );
}

export default Cards;