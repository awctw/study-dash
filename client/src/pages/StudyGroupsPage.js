import SideBar from "../components/SideBar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowLongRightIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatMembers from "../components/chat/chatMembers";
import { getUserChatsAsync, groupChatAsync } from "../store/chat/thunks";

const StudyGroupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginReducer.user);
  const chats = useSelector((state) => state.chatReducer.chats);
  const [chatName, setChatName] = useState("");
  const [openCreateChat, setOpenCreateChat] = useState(false);

  useEffect(() => {
    dispatch(getUserChatsAsync(user.username));
  }, [user]);

  const createChatHandler = () => {
    setOpenCreateChat(!openCreateChat);
  };

  const onClickHandler = (event) => {
    if (chatName.length < 1) return;

    event.preventDefault();
    setOpenCreateChat(!openCreateChat);
    const id = uuidv4();

    const initChat = {
      groupID: id,
      chatName: chatName,
      username: user.username,
    };

    dispatch(groupChatAsync(initChat));
    navigate(`/chat/${id}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="p-5 !pl-[300px]">
        <div className="mx-5">
          <Button onClick={createChatHandler} className="bg-indigo-300 m-2">
            Create Chat
          </Button>
          <div className="flex flex-wrap justify-center">
            {chats &&
              chats.map((chat, index) => (
                <Card className="mt-6 w-80 m-5" key={index}>
                  <CardBody className="pb-2">
                    <ChatBubbleLeftRightIcon className="text-indigo-300 w-12 h-12 mb-4" />
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Group Chat: {chat.name}
                    </Typography>
                    <ChatMembers users={chat.users} />
                  </CardBody>
                  <CardFooter className="pt-0">
                    <a href={`/chat/${chat.groupID}`} className="inline-block">
                      <Button className="flex gap-2 items-center bg-indigo-50 text-indigo-300 py-1 px-2 shadow-none hover:shadow-none normal-case font-sans font-medium text-sm border">
                        Enter Chat
                        <ArrowLongRightIcon
                          strokeWidth={2}
                          className="w-4 h-4"
                        />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
        <Dialog
          open={openCreateChat}
          handler={setOpenCreateChat}
          size="md"
          className="flex flex-row bg-transparent shadow-none items-center justify-center"
        >
          <Card className="relative flex w-2/4 rounded-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100">
            <CardBody className="mb-2">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Create a group chat!
              </Typography>
              <Typography className="mb-3">
                We'll need a concise name for it first! what would you like to
                call this chat?
              </Typography>
              <Input
                variant="outlined"
                label="Chat Name"
                color="blue-gray"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
              <Button
                size="sm"
                variant="text"
                color="blue-gray"
                className="flex items-center mt-3 border border-gray-400/70"
                onClick={onClickHandler}
              >
                Confirm
              </Button>
            </CardBody>
          </Card>
        </Dialog>
      </div>
    </div>
  );
};

export default StudyGroupPage;
