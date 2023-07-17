import io from "socket.io-client";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import {
  Card,
  IconButton,
  Textarea,
  Chip,
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
  putChatHistoryAsync,
  renameChatAsync,
} from "../store/chat/thunks";
import {
  inviteUserAsync,
  getUserAsync,
  leaveChatAsync,
} from "../store/authentication/thunks";
import { useNavigate } from "react-router-dom";

// Credits: Setting up socket io for chat
// https://dev.to/bhavik786/building-a-real-time-chat-application-using-mern-stack-and-socketio-1obn
const ChatPage = () => {
  const URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://studyDash-server.onrender.com";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chat = useSelector((state) => state.chatReducer.chat);
  const user = useSelector((state) => state.loginReducer);
  const groupID = window.location.pathname.split("/").pop();

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

  useEffect(() => {
    dispatch(getChatHistoryAsync(groupID));
  }, [dispatch, groupID]);

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
    dispatch(putChatHistoryAsync({ groupID, newMessage: message }));
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
        <div className="flex justify-center">
          <Chip
            value={chat.name ? chat.name : ""}
            variant="outlined"
            className="text-center text-indigo-300 w-3/5 text-ellipsis overflow-hidden"
          />
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
            <Card className="flex mb-5">
              <ul className="p-5 max-h-[30rem] overflow-y-auto scrollbar-width:none">
                {chat.history
                  ? chat.history.map((message, index) => (
                      <li key={index}>
                        <span className="font-bold">{message.username}: </span>
                        {message.message}
                      </li>
                    ))
                  : null}
              </ul>
            </Card>
            <Card className="flex">
              <form onSubmit={handleSubmit} className="flex p-5">
                <Textarea
                  label="Message"
                  value={message}
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
              placeholder={chat.name ? chat.name : ""}
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

export default ChatPage;
