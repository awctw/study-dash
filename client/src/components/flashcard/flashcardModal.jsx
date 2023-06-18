import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Card,
  List,
  ListItem,
  Typography,
  ListItemPrefix,
  IconButton,
} from "@material-tailwind/react";
import { BookOpenIcon, CubeIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "./flashcards";
import AddModuleModal from "./addModuleModal";

const FlashCardModal = (props) => {
  const modules = useSelector((state) => state.flashcards.modules);
  const [id, setId] = useState(props.moduleId);
  const [key, setKey] = useState(props.moduleId);

  useEffect(() => {
    setId(props.moduleId);
  }, [props.moduleId]);

  const handleReset = () => {
    setKey((key) => key + 1);
  };

  return (
    <>
      <Dialog
        open={props.visible ? props.visible : false}
        handler={props.setVisible}
        size="xl"
        className="flex flex-row bg-transparent shadow-none"
      >
        <Card
          tabIndex={1}
          className="relative w-1/4 w-min-1/4 h-[70vh] rounded-lg"
        >
          <div className="flex items-center gap-4 p-4">
            <img
              src={require("../../assets/modules-icon.png")}
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Modules
            </Typography>
          </div>
          <List>
            {modules && modules.map((module, i) => (
              <ListItem
                selected={module._id === id}
                key={module._id}
                onClick={() => {
                  setId(module._id);
                  setKey(module._id);
                }}
              >
                {module.name}
              </ListItem>
            ))}
          </List>
          <AddModuleModal />
        </Card>
        {/* 
                        Self-note: Passing key below was critical to re-render each module from the beginning!
                        When React renders a list of components, it uses the key prop to identify each component uniquely. 
                        When the key prop of a component changes, React considers it as a completely new instance, even if 
                        the component type remains the same. This triggers a re-render of the component, 
                        including its child components. 
                 */}
        <Card
          className="w-3/4 rounded-lg ml-2 items-center shadow-none"
          key={key}
        >
          {id && <Cards moduleId={id} reset={handleReset} />}
        </Card>
      </Dialog>
    </>
  );
};

export default FlashCardModal;
