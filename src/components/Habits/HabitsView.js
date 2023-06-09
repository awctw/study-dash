import {
  Button,
  Card,
  Input,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Checkbox,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ListBulletIcon } from "@heroicons/react/24/solid";

import { useState } from "react";

const HabitsView = () => {
  /* Adapted From Material UI Docs */
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Card className="w-80 shadow-xl shadow-pmd-blue-600">
        <CardBody className="flex-1">
          <div className="mb-2 flex items-center gap-4 p-4">
            <ListBulletIcon className="blue-gray w-8 h-8" />
            <Typography variant="h5" color="blue-gray">
              Habits
            </Typography>
          </div>
          <List>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-1"
                className="px-3 py-2 flex items-center w-full cursor-pointer"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-1"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Sketch a Portrait
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-2"
                className="px-3 py-2 flex items-center w-full cursor-pointer"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-2"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Do 20 Pushups
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-3"
                className="px-3 py-2 flex items-center w-full cursor-pointer"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-3"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Finish a LeetCode Problem
                </Typography>
              </label>
            </ListItem>
          </List>
          <div className="flex flex-col items-center mt-8">
            <Button
              onClick={handleOpen}
              className="bg-indigo-300 hover:shadow-indigo-100 shadow-indigo-100"
            >
              Add Habit
            </Button>
          </div>
        </CardBody>
      </Card>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Habit</DialogHeader>
        <DialogBody>
          <Input size="lg" label="Name" />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 hover:bg-indigo-50 text-indigo-300"
          >
            Cancel
          </Button>
          <Button
            className="bg-indigo-300 hover:shadow-indigo-100 shadow-indigo-100"
            onClick={handleOpen}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default HabitsView;
