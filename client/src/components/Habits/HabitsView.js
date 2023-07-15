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
import { TimePicker } from "@mui/x-date-pickers";
import { ListBulletIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHabitsAsync, addHabitAsync } from "../../store/habits/thunks";
import dayjs from "dayjs";

const HabitsView = () => {
  /* Adapted From Material UI Docs */
  const user = useSelector((state) => state.loginReducer);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [days, setDays] = useState(new Array(7).fill(true));
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());

  const { habits } = useSelector((state) => state.habitReducer);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(getHabitsAsync(user.user.userID));
    }
  }, [dispatch, user]);

  const addNewHabit = () => {
    const habit = {
      userID: user.user.userID,
      name: name,
      days: days,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };
    dispatch(addHabitAsync(habit));
    handleOpen();
  };

  const handleDays = (i) => {
    let newDays = [...days];
    newDays[i] = !newDays[i];
    setDays(newDays);
  };

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
            {habits.map((habit) => {
              return (
                <ListItem key={habit._id} className="p-0">
                  <label
                    htmlFor={habit._id}
                    className="px-3 py-2 flex items-center w-full cursor-pointer"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id={habit._id}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      {habit.name}
                    </Typography>
                  </label>
                </ListItem>
              );
            })}
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
          <Input
            size="lg"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TimePicker
            label="start-time"
            disableOpenPicker
            onChange={(newStart) => setStartTime(newStart)}
          />
          <TimePicker
            label="end-time"
            disableOpenPicker
            onChange={(newEnd) => setEndTime(newEnd)}
          />
          <br></br>
          <label htmlFor="sunday">
            <Checkbox
              id="sunday"
              defaultChecked
              icon={"S"}
              ripple={false}
              className="w-8 h-8"
              onChange={() => handleDays(0)}
            />
          </label>
          <label htmlFor="monday">
            <Checkbox
              id="monday"
              defaultChecked
              icon={"M"}
              ripple={false}
              className="w-8 h-8"
              onChange={() => handleDays(1)}
            />
          </label>
          <label htmlFor="tuesday">
            <Checkbox
              id="tuesday"
              defaultChecked
              icon={"T"}
              ripple={false}
              className="w-8 h-8"
              onChange={() => handleDays(2)}
            />
          </label>
          <label htmlFor="wednesday">
            <Checkbox
              id="wednesday"
              defaultChecked
              icon={"W"}
              ripple={false}
              className="w-8 h-8"
              onChange={() => handleDays(3)}
            />
          </label>
          <label htmlFor="thursday">
            <Checkbox
              id="thursday"
              defaultChecked
              icon={"T"}
              ripple={false}
              className="w-8 h-8"
              onChange={() => handleDays(4)}
            />
          </label>
          <label htmlFor="friday">
            <Checkbox
              id="friday"
              defaultChecked
              icon={"F"}
              ripple={false}
              className="w-8 h-8"
              onChange={() => handleDays(5)}
            />
          </label>
          <label htmlFor="saturday">
            <Checkbox
              id="saturday"
              defaultChecked
              icon={"S"}
              ripple={false}
              className="w-8 h-8"
              onChange={() => handleDays(6)}
            />
          </label>
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
            onClick={addNewHabit}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default HabitsView;
