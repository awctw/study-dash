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

const Overview = (props) => {
  const modules = useSelector((state) => state.flashcards.modules);
  const [visible, setVisible] = useState(false);
  const [modId, setModId] = useState(modules[0].id);

  return (
    <>
      <Card className="w-110 h-[21.5rem] flex shadow-xl shadow-pmd-blue-600">
        <CardBody className="overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-gray-400/50">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Flashcards
          </Typography>
          <Typography className="mb-3">
            Here is an overview of all your flashcard modules. Click to start
            reviewing!
          </Typography>
          <List className="pl-0">
            {modules.map((module, i) => (
              <ListItem
                key={i}
                onClick={() => {
                  setModId(module.id);
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
              setModId(modules[0].id);
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
