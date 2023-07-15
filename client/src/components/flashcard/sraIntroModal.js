import { ArrowRightIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const SraIntroModal = (props) => {
  return (
    <>
      {props.children}
      <Dialog
        open={props.visible}
        handler={props.setVisible}
        size="md"
        className="flex flex-row bg-transparent shadow-none items-center justify-center"
      >
        <Card className="relative flex rounded-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100">
          <CardBody className="mb-2 pt-2">
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-2 font-sans flex flex-row items-center"
            >
              Welcome to Smart Study!
              <Player
                src={
                  "https://assets10.lottiefiles.com/packages/lf20_gtymvdgw.json"
                }
                style={{ height: "65px", width: "65px", marginLeft: 5 }}
                autoplay
                keepLastFrame
                speed={0.8}
              />
            </Typography>
            <Typography className="mb-3 font-sans text-base">
              Revolutionize your study routine with our innovative Smart Study
              feature. Say goodbye to cramming and hello to effective,
              long-lasting knowledge retention. 🚀
              <br />
              <br />
              Smart Study harnesses the power of spaced repetition, By
              intelligently scheduling flashcard reviews based on your
              performance, it optimizes your learning process, making it easier
              than ever to master new concepts and boost your grades. 💪
              <br />
              <br />
              Ready to level up your study game? 🌟✨ <br />
              <br />
            </Typography>
            <Button
              size="sm"
              className="flex justify-center items-center gap-3 bg-pink-50 text-pink-600 py-1.5 shadow-none hover:shadow-pink-100 hover:shadow-none normal-case font-sans font-semibold text-sm border"
              onClick={() => {
                props.setShowSra(true);
                props.setVisible(false);
              }}
            >
              Let's get started
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
};

export default SraIntroModal;
