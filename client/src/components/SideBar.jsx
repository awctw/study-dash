import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import {
  RectangleGroupIcon,
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  ListBulletIcon,
  ChartBarIcon,
  UserCircleIcon,
  UserGroupIcon,
  ClockIcon,
  PowerIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoginAsync,
  userLogoutAsync,
} from "../store/authentication/thunks";

// Credits: Material Tailwind doc example
const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);
  const handleLogin = () => {
    setOpen(!open);

    const user = {
      username: username,
      password: password,
    };

    dispatch(userLoginAsync(user));
  };

  const handleLogout = () => {
    setOpen(!open);

    const user = {
      username: username,
      password: password,
    };

    dispatch(userLogoutAsync(user));
  };

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <NavLink to={"/dashboard"}>
        <div className="mb-2 flex items-center gap-4 p-4">
          <AcademicCapIcon className="h-8 w-8" />
          <Typography variant="h5" color="blue-gray">
            STUDYDASH
          </Typography>
        </div>
      </NavLink>
      <List>
        <NavLink to={"/profile"}>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </NavLink>
        <NavLink to={"/dashboard"}>
          <ListItem>
            <ListItemPrefix>
              <RectangleGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </NavLink>
        <NavLink to={"/todos"}>
          <ListItem>
            <ListItemPrefix>
              <ListBulletIcon className="h-5 w-5" />
            </ListItemPrefix>
            TODO
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </NavLink>
        <NavLink to={"/habits"}>
          <ListItem>
            <ListItemPrefix>
              <ArrowPathRoundedSquareIcon className="h-5 w-5" />
            </ListItemPrefix>
            Habits
          </ListItem>
        </NavLink>
        <NavLink to={"/timer"}>
          <ListItem>
            <ListItemPrefix>
              <ClockIcon className="h-5 w-5" />
            </ListItemPrefix>
            Timer
          </ListItem>
        </NavLink>
        <NavLink to={"/statistics"}>
          <ListItem>
            <ListItemPrefix>
              <ChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Statistics
          </ListItem>
        </NavLink>
        <NavLink to={"/studyGroups"}>
          <ListItem>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            Study Groups
          </ListItem>
        </NavLink>

        {user.isLoggedIn ? (
          <>
            <ListItem onClick={handleOpen}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Logout</DialogHeader>
              <DialogBody divider>
                Do you really wish to leave and logout? All unsaved changes will
                be lost.
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  onClick={handleOpen}
                  className="mr-1 text-indigo-300"
                >
                  <span>Cancel</span>
                </Button>
                <NavLink to={"/dashboard"}>
                  <Button className="bg-indigo-300" onClick={handleLogout}>
                    <span>Confirm</span>
                  </Button>
                </NavLink>
              </DialogFooter>
            </Dialog>
          </>
        ) : (
          <>
            <ListItem onClick={handleOpen}>
              <ListItemPrefix>
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Sign In
            </ListItem>
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full max-w-[24rem]">
                <CardHeader
                  variant="gradient"
                  className="mb-4 grid h-28 place-items-center bg-indigo-300"
                >
                  <Typography variant="h3" color="white">
                    Sign In
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Input
                    label="Username"
                    size="lg"
                    onChange={userNameHandler}
                  />
                  <Input
                    label="Password"
                    type="Password"
                    size="lg"
                    onChange={passwordHandler}
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <NavLink to={"/dashboard"}>
                    <Button
                      className="bg-indigo-300"
                      onClick={handleLogin}
                      fullWidth
                    >
                      Sign In
                    </Button>
                  </NavLink>
                  <div className="mt-6 flex justify-center items-center">
                    <Typography variant="small">
                      Don&apos;t have an account?
                    </Typography>
                    <NavLink to={"/register"}>
                      <Typography
                        variant="small"
                        className="ml-1 font-bold text-indigo-300"
                        onClick={handleOpen}
                      >
                        Sign up
                      </Typography>
                    </NavLink>
                  </div>
                </CardFooter>
              </Card>
            </Dialog>
          </>
        )}
      </List>
    </Card>
  );
};

export default SideBar;
