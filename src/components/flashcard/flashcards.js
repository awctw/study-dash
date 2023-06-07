import { ArrowLeftIcon, ArrowPathRoundedSquareIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card, Carousel, IconButton, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatusBar from "./statusBar";

const Cards = (props) => {
    const module = useSelector(state => state.flashcards.modules.find(module => module.id === props.moduleId));
    const [flip, setFlip] = useState(false);

    return (
        <>
            <Carousel
                className="bg-transparent h-[85%] w-full border border-b-light-blue-500"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
                            }`}
                            onClick={() => setActiveIndex(i)}
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
                                <div className={`card ${flip ? 'flipped' : ''} bg-purple-theme rounded-3xl`}>
                                    <div className="front items-center justify-center">
                                        <Typography variant="h2" className="text-gray-50 mx-28 text-center">{question}</Typography>
                                    </div>
                                    <div className="back items-center justify-center">
                                        <Typography variant="h4" className="text-gray-50 mx-28 text-center">{module.answers[i]}</Typography>
                                    </div>
                                </div>
                            </Card>
                        </>
                    ))
                }
            </Carousel>
            <div className="w-full h-[15%] flex justify-center items-center">
                {/* <IconButton
                    size="md"
                    variant="text"
                    className="mt-2"
                    color="blue-gray"
                    onClick={() => { setFlip(!flip); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                </IconButton> */}
                <StatusBar />
            </div>
        </>
    );
}

export default Cards;