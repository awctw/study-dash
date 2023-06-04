import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  RectangleGroupIcon,
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  ListBulletIcon,
  ChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ClockIcon,
  PowerIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

// Credits: Material Tailwind doc example
const SideBar = () => {
  return (
    <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <AcademicCapIcon className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          STUDYDASH
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <RectangleGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BookOpenIcon className="h-5 w-5" />
          </ListItemPrefix>
          Flashcards
        </ListItem>
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
        <ListItem>
          <ListItemPrefix>
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          </ListItemPrefix>
          Habits
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ClockIcon className="h-5 w-5" />
          </ListItemPrefix>
          Timer
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Statistics
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          Study Groups
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default SideBar;
