import { Card, CardBody, Typography } from "@material-tailwind/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHabitsAsync } from "../../store/habits/thunks";
import dayjs from "dayjs";
import HeatMap from "@uiw/react-heat-map";

const DetailedHabitsView = () => {
  const user = useSelector((state) => state.loginReducer);
  const { habits } = useSelector((state) => state.habitReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(getHabitsAsync(user.user.userID));
    }
  }, [dispatch, user]);

  const parseHabitDates = (dates) => {
    return dates.map((d) => {
      return { date: d, count: 1 };
    });
  };

  const getStartDate = () => {
    const day = new Date();
    return new Date(dayjs(day).subtract(1, "year").format("YYYY/MM/DD"));
  };

  const getEndDate = () => {
    return new Date();
  };

  return (
    <>
      {habits.map((habit) => {
        return (
          <Card
            key={habit._id}
            className="shadow-xl shadow-pmd-blue-600 m-8 min-w-[50rem]"
          >
            <CardBody className="flex-1">
              <Typography color="blue-gray" variant="h5">
                {habit.name}
              </Typography>
              <br />
              <HeatMap
                width={730}
                value={parseHabitDates(habit.dates)}
                startDate={getStartDate()}
                endDate={getEndDate()}
                legendCellSize={0}
              />
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};

export default DetailedHabitsView;
