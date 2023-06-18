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

const Overview = (props) => {
  const modules = useSelector((state) => state.flashcards.modules);
  const [visible, setVisible] = useState(false);
  const [modId, setModId] = useState();

  return (
    <>
      <Card className="w-110 h-[21.5rem] flex shadow-xl shadow-pmd-blue-600">
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
            {modules &&
              modules.map((module, i) => (
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
                      {module.questions.length} flashcards
                    </Typography>
                  </div>
                </ListItem>
              ))}
          </List>
        </CardBody>
        <CardFooter className="py-3 border-t border-gray-400/50">
          <Button
            onClick={() => {
              setModId(modules[0]._id);
              setVisible(true);
            }}
            className="bg-indigo-300 hover:shadow-indigo-100 shadow-indigo-100"
          >
            Start Review!
          </Button>
          <FlashCardModal
            visible={visible}
            setVisible={setVisible}
            moduleId={modId}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default Overview;
