import {
  Button,
  Card,
  CardBody,
  CardFooter,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlashCardModal from "./flashcardModal";
import { getModulesAsync } from "../../store/flashcards/thunks";
import { Player } from "@lottiefiles/react-lottie-player";
import AddModuleModal from "./addModuleModal";

const Overview = (props) => {
  const modules = useSelector((state) => state.flashcards.modules);
  const [visible, setVisible] = useState(false);
  const [initVisible, setInitVisible] = useState(false);
  const [modId, setModId] = useState();

  return (
    <>
      {modules.length > 0 ? (
        <Card className="w-110 max-h-[21.5rem] flex shadow-xl shadow-pmd-blue-600">
          <div className="p-3">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Flashcards
            </Typography>
            <Typography className="mb-3">
              Here is an overview of all your flashcard modules. Click to start
              reviewing!
            </Typography>
          </div>
          <CardBody className="pt-0 overflow-y-auto scrollbar-hide">
            <List className="pl-0">
              {modules.map((module, i) => (
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
          <CardFooter className="py-3 h-[4rem] border-t border-gray-400/50">
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
        <Card className="w-[18rem] h-max-[21.5rem] flex shadow-xl shadow-pmd-blue-600">
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
          <CardFooter className="py-3 border-t border-gray-400/50">
            <AddModuleModal
              visible={initVisible}
              setVisible={setInitVisible}
              setMainVisible={setVisible}
            >
              <Button
                onClick={() => {
                  setInitVisible(true);
                }}
                className="bg-indigo-300 hover:shadow-indigo-100 shadow-indigo-100"
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
