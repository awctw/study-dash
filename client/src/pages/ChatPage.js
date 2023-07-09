import io from "socket.io-client";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { Card, IconButton, Textarea } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { getChatHistoryAsync, putChatHistoryAsync } from "../store/chat/thunks";

// Credits: Setting up socket io for chat
// https://dev.to/bhavik786/building-a-real-time-chat-application-using-mern-stack-and-socketio-1obn
const ChatPage = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chatReducer.chat);
  const user = useSelector((state) => state.loginReducer);
  const username = user.user.username;
  const groupID = window.location.pathname.split("/").pop();

  useEffect(() => {
    dispatch(getChatHistoryAsync(groupID));
  }, [dispatch, groupID]);

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
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

  return (
    <div>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="p-5 !pl-[300px]">
        <div className="mx-24 mb-5 absolute bottom-0 w-3/5">
          <Card className="flex mb-5">
            <ul className="p-5 max-h-[30rem] overflow-y-scroll">
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
  );
};

export default ChatPage;
