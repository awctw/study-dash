import {
  Button,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const ChatMembers = (props) => {
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Button className="flex bg-indigo-50 text-indigo-300 py-1 px-2 shadow-none hover:shadow-none normal-case font-sans font-medium text-sm border">
          View group members
        </Button>
      </PopoverHandler>
      <PopoverContent className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-blue-gray-100/50 border border-gray-300">
        <List className="p-0" tabIndex={1}>
          {props.users &&
            props.users.map((user, i) => (
              <ListItem key={i} className="py-2">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {user}
                </Typography>
              </ListItem>
            ))}
        </List>
      </PopoverContent>
    </Popover>
  );
};

export default ChatMembers;
