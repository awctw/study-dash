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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInvitesAsync } from "../../store/authentication/thunks";
import { getUserChatsAsync } from "../../store/chat/thunks";

const InvitesDrawer = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const invites = useSelector((state) => state.loginReducer.invites);
  const user = useSelector((state) => state.loginReducer.user);

  const onOpenDrawer = () => {
    setOpen(!open);
    dispatch(getUserInvitesAsync(user.username));
  };

  const onCloseDrawer = () => {
    setOpen(false);
    // need to refresh chat groups after accepting/declining invites
    dispatch(getUserChatsAsync(user.username));
  };

  return (
    <>
      <Badge className={`bg-red-500`}>
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
        className="flex flex-col p-4 mt-2 mr-2 rounded-xl border !h-[97%] border-gray-400/70 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-gray-100/50 shadow-lg"
        overlay={false}
        size={350}
        onClose={onCloseDrawer}
      >
        <Invite />
      </Drawer>
    </>
  );
};

const Invite = (props) => {
  return (
    <div
      className={`max-w-md w-full mt-3 bg-white shadow-lg border-l-4 border-indigo-300 rounded-tr-xl rounded-br-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 `}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {"Group Chat 1"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {"Group Chat 1"} has invited you to come join!
            </p>
          </div>
        </div>
        <div className="flex flex-row ml-2 mt-3 items-center">
          <Button className="flex items-center bg-indigo-50 text-indigo-300 py-1 px-2 shadow-none hover:shadow-none normal-case font-sans font-medium text-sm border">
            Accept
          </Button>
          <Button className="ml-2 flex items-center bg-transparent text-indigo-300 py-1 px-2 shadow-none hover:shadow-none normal-case font-sans font-medium text-sm">
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvitesDrawer;
