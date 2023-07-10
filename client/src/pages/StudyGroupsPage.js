import SideBar from "../components/SideBar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowLongRightIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { postChatHistoryAsync } from "../store/chat/thunks";
import { getUserAsync, groupChatAsync } from "../store/authentication/thunks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudyGroupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginReducer.user);

  useEffect(() => {
    if (user) {
      dispatch(getUserAsync(user.userID));
    }
  }, [dispatch]);

  const onClickHandler = (event) => {
    event.preventDefault();
    const id = uuidv4();

    const initChat = {
      groupID: id,
    };

    const updatedUser = {
      username: user.username,
      groupID: id,
    };

    dispatch(groupChatAsync(updatedUser));
    dispatch(postChatHistoryAsync(initChat));
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
        <div className="mx-24">
          <Button onClick={onClickHandler} className="bg-indigo-300 m-2">
            Create Chat
          </Button>

          {user && user.groupID
            ? user.groupID.map((group, index) => (
                <Card className="mt-6 w-96 m-5" key={index}>
                  <CardBody>
                    <ChatBubbleLeftRightIcon className="text-indigo-300 w-12 h-12 mb-4" />
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Group Chat: {group}
                    </Typography>
                    <Typography>Members:</Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <a href={`/chat/${group}`} className="inline-block">
                      <Button
                        size="sm"
                        variant="text"
                        className="flex items-center gap-2 text-indigo-300"
                      >
                        Enter Chat
                        <ArrowLongRightIcon
                          strokeWidth={2}
                          className="w-4 h-4"
                        />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default StudyGroupPage;
