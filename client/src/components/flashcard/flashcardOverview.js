import {
  Button,
  Card,
  CardBody,
  CardFooter,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import FlashCardModal from "./flashcardModal";
import { Player } from "@lottiefiles/react-lottie-player";
import AddModuleModal from "./addModuleModal";

const Overview = () => {
  const modules = useSelector((state) => state.flashcards.modules);
  const [visible, setVisible] = useState(false);
  const [initVisible, setInitVisible] = useState(false);
  const [modId, setModId] = useState();

  return (
    <>
      {modules.length > 0 ? (
        <Card className="min-w-[40rem] max-h-[30rem] flex shadow-xl shadow-pmd-blue-600">
          <div className="p-3 pb-0">
            <Typography variant="h5" color="blue-gray">
              Flashcards
            </Typography>
            <Typography className="mb-3">
              Here is an overview of all your flashcard modules. Click to start
              reviewing!
            </Typography>
          </div>
          <CardBody className="pt-0 max-h-[15rem] overflow-y-auto scrollbar-none scrollbar-thumb-rounded-full scrollbar-thumb-blue-gray-100/50">
            <List className="pl-0">
              {modules.map((module) => (
                <ListItem
                  key={module._id}
                  onClick={() => {
                    setModId(module._id);
                    setVisible(true);
                  }}
                >
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {module.name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {module.flashcards.length} flashcards
                    </Typography>
                  </div>
                </ListItem>
              ))}
            </List>
          </CardBody>
          <CardFooter className="flex items-center py-3 border-t border-gray-400/50">
            <Button
              onClick={() => {
                setModId(modules[0]._id);
                setVisible(true);
              }}
              className="bg-indigo-300 hover:shadow-indigo-100 shadow-indigo-100"
            >
              Start Review!
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="min-w-[40rem] max-h-[25rem] flex shadow-xl shadow-pmd-blue-600">
          <div className="p-3">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Flashcards
            </Typography>
            <Typography className="mb-3 pb-0">
              Looks like you don't have any flashcards yet.
            </Typography>
          </div>
          <div className="flex items-center justify-center">
            <Player
              src={
                "https://assets8.lottiefiles.com/datafiles/wqxpXEEPRQf1JnQ/data.json"
              }
              style={{ height: "180px", width: "180px", padding: 0 }}
              autoplay
              loop
            />
          </div>
          <CardFooter className="flex items-center py-3 border-t border-gray-400/50">
            <AddModuleModal
              visible={initVisible}
              setVisible={setInitVisible}
              setMainVisible={setVisible}
            >
              <Button
                onClick={() => {
                  setInitVisible(true);
                }}
                className="bg-indigo-300 hover:shadow-indigo-100 shadow-indigo-100 m-0"
              >
                Get Started
              </Button>
            </AddModuleModal>
          </CardFooter>
        </Card>
      )}
      <FlashCardModal
        visible={visible}
        setVisible={setVisible}
        moduleId={modId}
      />
    </>
  );
};

export default Overview;
