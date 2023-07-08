import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const Scale = (props) => {
  const confidenceColors = ["red", "orange", "amber", "green", "light-green"];

  return (
    <Card className="w-full bg-transparent flex flex-row justify-evenly shadow-none">
      {confidenceColors.map((color, i) => (
        <div key={i} className="flex flex-col items-center">
          <Button
            disabled={props.disabled}
            variant="gradient"
            color={color}
            className="rounded-full w-10 h-10 p-0"
            onClick={() => {
              props.setAnswered((prevArray) => {
                const newArr = [...prevArray];
                newArr[props.cardIndex] = true;
                return newArr;
              });

              if (i >= 2) {
                props.setNumCorrect((numCorrect) => numCorrect + 1);
              } else {
                props.setNumWrong((numWrong) => numWrong + 1);
              }

              props.setFlip(false);
            }}
          >
            {i + 1}
          </Button>
          {i === 0 && (
            <Typography className="text-[12px] text-gray-300/80 my-2">
              I'm blank
            </Typography>
          )}
          {i === 4 && (
            <Typography className="text-[12px] text-gray-300/80 my-2">
              I got this!
            </Typography>
          )}
        </div>
      ))}
    </Card>
  );
};

export default Scale;
