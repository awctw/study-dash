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
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowRightOnRectangleIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  getChatHistoryAsync,
  inviteUserAsync,
  leaveChatAsync,
  putChatHistoryAsync,
  renameChatAsync,
} from "../store/chat/thunks";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
    newSocket.emit("joinRoom", groupID);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", handleMessage);
    }

    return () => {
      if (socket) {
        socket.off("message");
        // socket.off("message", handleMessage);
      }
    };
  }, [socket]);

  const handleMessage = (message) => {
    console.log(message);

    dispatch(
      putChatHistoryAsync({
        groupID,
        newMessage: message,
        username: username,
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", {
        newMessage: {
          id: uuidv4(),
          username,
          message,
        },
        groupID,
      });
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
        <div className="flex justify-center">
          <div className="w-4/5 text-ellipsis overflow-hidden">
            <Typography className="font-sans text-black/80 font-semibold text-4xl">
              {currChat && currChat.name}
            </Typography>
            <Typography className="text-blue-gray-400 font-sans text-md ml-1">
              {currChat.users && currChat.users.length} members
            </Typography>
            <hr className="mt-3 border-blue-gray-300/40 w-[95%]" />
          </div>
        </div>

        <div className="absolute top-0 right-0 m-5">
          <IconButton
            type="submit"
            onClick={changeNameHandler}
            className="flex bg-indigo-300 ml-5 mb-2"
          >
            <PencilSquareIcon className="h-5 w-5 " />
          </IconButton>

          <IconButton
            type="submit"
            onClick={addUserHandler}
            className="flex bg-indigo-300 ml-5 mb-2"
          >
            <UserPlusIcon className="h-5 w-5" />
          </IconButton>

          <IconButton
            type="submit"
            onClick={exitUserHandler}
            className="flex bg-indigo-300 ml-5 mb-2"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="flex justify-center">
          <div className="mb-5 absolute bottom-0 w-3/5">
            <Card className="flex mb-5 px-5 py-0 max-h-[30rem] overflow-y-auto scrollbar scrollbar-none shadow-none">
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
            className="flex items-center mr-2 border border-gray-400/70"
            onClick={exitUserHandler}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="text"
            color="blue-gray"
            className="flex items-center border border-gray-400/70"
            onClick={onExitUser}
          >
            Yes
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
