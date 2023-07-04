import io from "socket.io-client";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { Card, IconButton, Textarea } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

// Credits: Setting up socket io for chat
// https://dev.to/bhavik786/building-a-real-time-chat-application-using-mern-stack-and-socketio-1obn
const StudyGroupPage = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector((state) => state.loginReducer);
  const username = user.user.username;

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
    setMessages((messages) => [...messages, message]);
  };

  const handleSubmit = (event) => {
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
              {messages.map((message, index) => (
                <li key={index}>
                  <span className="font-bold">{message.username}: </span>
                  {message.message}
                </li>
              ))}
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

export default StudyGroupPage;
