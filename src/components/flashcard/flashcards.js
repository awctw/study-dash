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
                className="bg-transparent h-[85%] w-full"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "bg-blue-gray-700 w-8" : "bg-blue-gray-400/50 w-4"
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
                <StatusBar setFlip={setFlip} flip={flip} />
            </div>
        </>
    );
}

export default Cards;