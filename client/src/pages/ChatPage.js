import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import SideBar from "../components/SideBar";
import {
  Card,
  IconButton,
  Dialog,
  Typography,
  CardBody,
  Button,
  CardHeader,
  Input,
  CardFooter,
  DialogHeader,
  DialogFooter,
  DialogBody,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowRightOnRectangleIcon,
  EllipsisVerticalIcon,
  HomeIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  Square2StackIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  getChatHistoryAsync,
  inviteUserAsync,
  leaveChatAsync,
  putChatHistoryAsync,
  renameChatAsync,
} from "../store/chat/thunks";
import { useNavigate } from "react-router-dom";

// Credits: Setting up socket io for chat
// https://dev.to/bhavik786/building-a-real-time-chat-application-using-mern-stack-and-socketio-1obn
const ChatPage = () => {
  const URL = process.env.REACT_APP_BASE_SERVER_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currChat = useSelector((state) => state.chatReducer.currentChat);
  const user = useSelector((state) => state.loginReducer);
  const groupID = window.location.pathname.split("/").pop();
  const msgList = useRef(null);

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [openUser, setOpenUser] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openExit, setOpenExit] = useState(false);

  const [name, setName] = useState(user.user ? user.user.groupID : "");
  const [userInvite, setUserInvite] = useState(
    user.user ? user.user.groupID : ""
  );
  const username = user.user ? user.user.username : "";

  const scrollToBottom = () => {
    msgList.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getChatHistoryAsync(groupID));
  }, [dispatch, groupID]);

  useEffect(scrollToBottom, [currChat]);

  useEffect(() => {
    const newSocket = io(URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", handleMessage);
    }

    return () => {
      if (socket) {
        socket.off("message", handleMessage);
      }
    };
  }, [socket]);

  const handleMessage = (message) => {
    dispatch(
      putChatHistoryAsync({ groupID, newMessage: message, username: username })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", { username, message });
      setMessage("");
    }
  };

  const addUserHandler = () => {
    setOpenUser((cur) => !cur);
  };

  const exitUserHandler = () => {
    setOpenExit((cur) => !cur);
  };

  const changeNameHandler = () => {
    setOpenName((cur) => !cur);
  };

  const onChangeName = (event) => {
    if (name.length < 1) return;

    dispatch(
      renameChatAsync({
        groupID: groupID,
        name: name,
      })
    );
    changeNameHandler();
  };

  const onInviteUser = (event) => {
    setUserInvite(event.target.value);
  };

  const onExitUser = () => {
    dispatch(
      leaveChatAsync({
        username: username,
        groupID: groupID,
      })
    );
    exitUserHandler();
    navigate(`/studyGroups`);
  };

  const inviteDispatch = () => {
    const updatedUser = {
      username: userInvite,
      groupID: groupID,
    };

    dispatch(inviteUserAsync(updatedUser));

    addUserHandler();
  };

  if (!user.user) {
    return null;
  }

  return (
    <div>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="p-5 !pl-[300px]">
        <div className="relative flex justify-center">
          <div className="mx-7 flex-grow text-ellipsis overflow-hidden">
            <Typography className="font-sans text-black/80 font-semibold text-4xl">
              Study Group: {currChat && currChat.name}
            </Typography>
            <Typography className="text-blue-gray-400 font-sans text-md ml-1">
              {currChat.users && currChat.users.length} members
            </Typography>
            <hr className="mt-3 border-blue-gray-300/40 mr-7" />
          </div>

          <div className="absolute top-0 right-0 mr-[5%]">
            <SpeedDial placement="right">
              <SpeedDialHandler>
                <IconButton
                  size="md"
                  className="rounded-full border border-gray-400"
                  variant="text"
                  color="blue-gray"
                >
                  <EllipsisVerticalIcon className="block h-5 w-5 group-hover:hidden" />
                  <XMarkIcon className="hidden h-5 w-5 group-hover:block" />
                </IconButton>
              </SpeedDialHandler>
              <SpeedDialContent className="flex-row">
                <SpeedDialAction className="bg-indigo-50 border border-indigo-100">
                  <PencilSquareIcon
                    onClick={changeNameHandler}
                    className="h-5 w-5 text-indigo-300"
                  />
                </SpeedDialAction>
                <SpeedDialAction className="bg-indigo-50 border border-indigo-100">
                  <UserPlusIcon
                    onClick={addUserHandler}
                    className="h-5 w-5 text-indigo-300"
                  />
                </SpeedDialAction>
                <SpeedDialAction className="bg-indigo-50 border border-indigo-100">
                  <ArrowRightOnRectangleIcon
                    onClick={exitUserHandler}
                    className="h-5 w-5 text-indigo-300"
                  />
                </SpeedDialAction>
              </SpeedDialContent>
            </SpeedDial>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col justify-end ml-5 mr-12 flex-grow">
            <Card className="flex px-5 py-0 h-[70vh] overflow-y-auto scrollbar scrollbar-none shadow-none">
              {currChat.history &&
                currChat.history.map((message, index) => (
                  <div
                    key={index}
                    className={`flex flex-col mt-1 ${
                      username === message.username ? "items-end" : ""
                    }`}
                  >
                    {!isSameSender(currChat.history, index) ? (
                      <span
                        className={`font-semibold mt-3 text-gray-900/60 ${
                          username === message.username ? "pr-2" : "pl-1"
                        }`}
                      >
                        {message.username}
                      </span>
                    ) : (
                      <></>
                    )}
                    <span className="px-3 py-1 w-fit max-w-lg break-all rounded-full bg-indigo-50 text-indigo-300">
                      {message.message}
                    </span>
                  </div>
                ))}
              <hr className="w-0" ref={msgList} />
            </Card>
            <Card className="flex shadow-none">
              <form onSubmit={handleSubmit} className="flex p-5">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  className="focus:!border-t-indigo-300 focus:!border-indigo-300 ring-4 ring-transparent focus:ring-indigo-50 !border !border-blue-gray-100 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(event) => setMessage(event.target.value)}
                />

                <div className="flex items-center">
                  <IconButton type="submit" className="flex bg-indigo-300 ml-5">
                    <PaperAirplaneIcon className="h-3 w-3" />
                  </IconButton>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <Dialog
        size="sm"
        open={openUser}
        handler={addUserHandler}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-indigo-300"
          >
            <Typography variant="h3" color="white">
              Invite Friend
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Username" size="lg" onChange={onInviteUser} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-indigo-300"
              onClick={inviteDispatch}
              fullWidth
            >
              Invite
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <Dialog
        size="sm"
        open={openName}
        handler={changeNameHandler}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-indigo-300"
          >
            <Typography variant="h3" color="white">
              Change Group Name
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              placeholder={currChat.name ? currChat.name : ""}
              onChange={(e) => setName(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-indigo-300" onClick={onChangeName} fullWidth>
              Change
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <Dialog open={openExit} handler={exitUserHandler} size="sm">
        <DialogHeader>Are you sure you want to leave this chat?</DialogHeader>
        <DialogBody divider>
          Please note that you'll only be able to join this chat again through
          an invitation.
        </DialogBody>
        <DialogFooter>
          <Button
            size="sm"
            variant="text"
            color="blue-gray"
            className="flex items-center mr-2 border text-indigo-300 border-indigo-300"
            onClick={exitUserHandler}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="text"
            className="flex items-center text-white bg-indigo-300"
            onClick={onExitUser}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

const isSameSender = (messages, msgIdx) => {
  return (
    msgIdx >= 1 && messages[msgIdx - 1].username === messages[msgIdx].username
  );
};

export default ChatPage;
