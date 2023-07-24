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
} from "@material-tailwind/react";
import {
  RectangleGroupIcon,
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  ListBulletIcon,
  ChartBarIcon,
  UserCircleIcon,
  UserGroupIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAsync } from "../store/authentication/thunks";

// Credits: Material Tailwind doc example
const SideBar = () => {
  const [openLogout, setOpenLogout] = useState(false);

  const user = useSelector((state) => state.loginReducer);
  const { TODOList } = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenLogout = () => {
    setOpenLogout(!openLogout);
  };

  const handleLogout = () => {
    setOpenLogout(false);

    const logoutUser = {
      username: user.user.username,
    };

    dispatch(userLogoutAsync(logoutUser));
    navigate("/");
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
                value={TODOList.length}
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

        {user.isLoggedIn && (
          <>
            <ListItem onClick={handleOpenLogout}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
            <Dialog open={openLogout} handler={handleOpenLogout}>
              <DialogHeader>Logout</DialogHeader>
              <DialogBody divider>
                Do you really wish to leave and logout? All unsaved changes will
                be lost.
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  onClick={handleOpenLogout}
                  className="mr-1 text-indigo-300"
                >
                  <span>Cancel</span>
                </Button>
                <Button className="bg-indigo-300" onClick={handleLogout}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </>
        )}
      </List>
    </Card>
  );
};

export default SideBar;
