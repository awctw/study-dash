import SideBar from "../components/SideBar";
import { Button } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { postChatHistoryAsync } from "../store/chat/thunks";
import { groupChatAsync } from "../store/authentication/thunks";

import { useNavigate } from "react-router-dom";

const StudyGroupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginReducer);

  const onClickHandler = (event) => {
    event.preventDefault();
    const id = uuidv4();

    const initChat = {
      groupID: id,
    };

    const updatedUser = {
      userID: user.user.userID,
      groupID: user.user.groupID ? [...user.user.groupID, id] : [id],
    };

    dispatch(groupChatAsync(updatedUser));
    dispatch(postChatHistoryAsync(initChat));
    navigate(`/chat/${id}`);
  };

  return (
    <div>
      <div className="fixed left-0 top-0 z-[1035] h-screen">
        <SideBar />
      </div>
      <div className="p-5 !pl-[300px]">
        <Button onClick={onClickHandler}>Create Chat</Button>
      </div>
    </div>
  );
};

export default StudyGroupPage;
