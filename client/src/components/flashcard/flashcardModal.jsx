import {
  Dialog,
  Button,
  Card,
  List,
  ListItem,
  Typography,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "./flashcards";
import AddModuleModal from "./addModuleModal";
import DeleteModal from "./confirmDeleteModal";
import { Player } from "@lottiefiles/react-lottie-player";


const FlashCardModal = (props) => {
  const modules = useSelector((state) => state.flashcards.modules);
  const [id, setId] = useState(props.moduleId);
  const [key, setKey] = useState(props.moduleId);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  useEffect(() => {
    setId(props.moduleId);
    setKey(props.moduleId);
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
                ripple={false}
                selected={module._id === id}
                key={module._id}
                className="py-1 pr-1 pl-4"
                onClick={() => {
                  setId(module._id);
                  setKey(module._id);
                }}
              >
                {module.name}
                <ListItemSuffix className="p-0">
                  <IconButton variant="text" color="blue-gray" onClick={() => {
                    setDeleteVisible(!deleteVisible);
                  }}>
                    <TrashIcon className="h-4 w-4" />
                  </IconButton>
                </ListItemSuffix>
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
          <DeleteModal 
            visible={deleteVisible} 
            setVisible={setDeleteVisible} 
            object={"module"}
            moduleId={id}
            setId={setId}
          />
        </Card>
        {/* 
                        Self-note: Passing key below was critical to re-render each module from the beginning!
                        When React renders a list of components, it uses the key prop to identify each component uniquely. 
                        When the key prop of a component changes, React considers it as a completely new instance, even if 
                        the component type remains the same. This triggers a re-render of the component, 
                        including its child components. 
                 */}
        <Card
          className="w-3/4 rounded-lg ml-2 items-center justify-center shadow-none"
          key={key}
        >
          {/* needs at least 1 child */}
          <></>
          {
            modules.length > 0 ? 
            (
              <>
                {id && <Cards moduleId={id} reset={handleReset} />}
              </>
            ) :
            (
              <>
              <Player
                src={
                  "https://assets8.lottiefiles.com/datafiles/wqxpXEEPRQf1JnQ/data.json"
                }
                style={{ height: "250px", width: "250px", padding: 0 }}
                autoplay
                loop
              />
              <Typography className="text-blue-gray-300/70 font-sans text-lg">
                Looks like you don't have any modules. Please create one to get started!
              </Typography>
              </>
            )
          }
        </Card>
      </Dialog>
    </>
  );
};

export default FlashCardModal;
