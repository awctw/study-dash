import { EnvelopeIcon } from "@heroicons/react/24/solid";
import {
  Badge,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInvitesAsync } from "../../store/authentication/thunks";
import {
  getUserChatsAsync,
  respondToInviteAsync,
} from "../../store/chat/thunks";
import { Player } from "@lottiefiles/react-lottie-player";
import { loginActions } from "../../store/authentication/loginSlice";

const InvitesDrawer = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const invites = useSelector((state) => state.loginReducer.invites);
  const user = useSelector((state) => state.loginReducer.user);

  const onOpenDrawer = () => {
    setOpen(!open);
    dispatch(getUserInvitesAsync(user.userID));
  };

  const onCloseDrawer = () => {
    setOpen(false);
    // need to refresh chat groups after accepting/declining invites
    dispatch(getUserChatsAsync(user.username));
  };

  return (
    <>
      <Badge className={`${invites.length ? "bg-red-500" : "bg-transparent"}`}>
        <Tooltip content="Your Invites" placement="left">
          <IconButton
            className="flex items-center bg-indigo-50 text-indigo-300 p-1 shadow-none hover:shadow-none font-sans font-medium border"
            onClick={onOpenDrawer}
          >
            <EnvelopeIcon strokeWidth={1} className="w-5 h-5" />
          </IconButton>
        </Tooltip>
      </Badge>
      <Drawer
        open={open}
        placement="right"
        className="flex flex-col p-4 mt-2 mr-2 rounded-2xl border !h-[97%] border-gray-400/70 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-gray-100/50 shadow-lg"
        overlay={false}
        size={350}
        onClose={onCloseDrawer}
      >
        {invites.length > 0 ? (
          invites.map((invite) => (
            <Invite
              key={invite.groupID}
              chatName={invite.chatName}
              groupID={invite.groupID}
            />
          ))
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center">
            <Player
              src={
                "https://assets8.lottiefiles.com/datafiles/wqxpXEEPRQf1JnQ/data.json"
              }
              style={{ height: "180px", width: "180px", padding: 0 }}
              autoplay
              loop
            />
            <Typography className="text-blue-gray-300/70 font-sans text-lg">
              You have no invitations!
            </Typography>
          </div>
        )}
      </Drawer>
    </>
  );
};

const Invite = (props) => {
  const user = useSelector((state) => state.loginReducer.user);

  const dispatch = useDispatch();

  const acceptInvite = () => {
    dispatch(
      respondToInviteAsync({
        username: user.username,
        groupID: props.groupID,
        decision: "accepted",
      })
    );

    dispatch(loginActions.popInvite(props.groupID));
  };

  const declineInvite = () => {
    dispatch(
      respondToInviteAsync({
        username: user.username,
        groupID: props.groupID,
        decision: "declined",
      })
    );

    dispatch(loginActions.popInvite(props.groupID));
  };

  return (
    <div
      className={`max-w-md w-full mt-3 bg-white shadow-lg border-l-4 border-indigo-300 rounded-tr-xl rounded-br-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 `}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {props.chatName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {props.chatName} has invited you to come join!
            </p>
          </div>
        </div>
        <div className="flex flex-row ml-2 mt-3 items-center">
          <Button
            onClick={acceptInvite}
            className="flex items-center bg-indigo-50 text-indigo-300 py-1 px-2 shadow-none hover:shadow-none normal-case font-sans font-medium text-sm border"
          >
            Accept
          </Button>
          <Button
            onClick={declineInvite}
            className="ml-2 flex items-center bg-transparent text-indigo-300 py-1 px-2 shadow-none hover:shadow-none normal-case font-sans font-medium text-sm"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvitesDrawer;
