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
import { BoltIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./flashcards";
import AddModuleModal from "./addModuleModal";
import DeleteModal from "./confirmDeleteModal";
import { Player } from "@lottiefiles/react-lottie-player";
import SraIntroModal from "./sraIntroModal";
import SmartCards from "./smartStudyCarousel";
import { getScheduledCardsAsync } from "../../store/flashcards/thunks";


const FlashCardModal = (props) => {
  const modules = useSelector((state) => state.flashcards.modules);
  const user = useSelector((state) => state.loginReducer);
  const [id, setId] = useState(props.moduleId);
  const [key, setKey] = useState(props.moduleId);
  const [visible, setVisible] = useState(false);
  const [sraVisible, setSraVisible] = useState(false);
  const [showSra, setShowSra] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const dispatch = useDispatch();

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
            {
              modules.length > 0 ? 
              (
                <>
                  <SraIntroModal visible={sraVisible} setVisible={setSraVisible} setShowSra={setShowSra} >
                    <Button 
                      className="flex w-full justify-center items-center gap-3 bg-pink-50 text-pink-600 py-2.5 shadow-none hover:shadow-pink-100 hover:shadow-none normal-case font-sans font-semibold text-sm border"
                      onClick={() => {
                        setSraVisible(!sraVisible);
                        setKey("sra");
                        dispatch(getScheduledCardsAsync(user.user.userID));
                      }}
                    >
                      <BoltIcon className="w-5 h-5" strokeWidth={2} /> Smart Study
                    </Button>
                  </SraIntroModal>
                  <hr className="my-2 border-blue-gray-200/30" />
                </>
              ) :
              <></>
            }
            {modules && modules.map((module, i) => (
              <ListItem
                ripple={false}
                selected={module._id === id}
                key={module._id}
                className="py-1 pr-1 pl-4"
                onClick={() => {
                  setId(module._id);
                  setKey(module._id);
                  setShowSra(false);
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
                {
                  showSra ? 
                  <SmartCards reset={handleReset} /> :
                  (id && <Cards moduleId={id} reset={handleReset} />)
                }
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
