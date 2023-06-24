import {
  Dialog,
  Button,
  Card,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "./flashcards";
import AddModuleModal from "./addModuleModal";

const FlashCardModal = (props) => {
  const modules = useSelector((state) => state.flashcards.modules);
  const [id, setId] = useState(props.moduleId);
  const [key, setKey] = useState(props.moduleId);
  const [visible, setVisible] = useState(false);

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
          className="relative w-1/4 w-min-1/4 h-[70vh] rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100 shadow-none"
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
          <AddModuleModal visible={visible} setVisible={setVisible}>
            <div className="flex h-15 w-full relative">
            <Button
              color="blue-gray"
              variant="text"
              className="flex items-center w-full py-[0.7rem] justify-center mx-2 mb-2 border border-gray-400/70"
              onClick={() => setVisible(true)}
            >
              <PlusIcon className="h-5 w-5 text-center" />
            </Button>
            </div>
          </AddModuleModal>
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
          {/* needs at least 1 child */}
          <></>
          {id && <Cards moduleId={id} reset={handleReset} />}
        </Card>
      </Dialog>
    </>
  );
};

export default FlashCardModal;
