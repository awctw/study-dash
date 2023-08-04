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

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHabitsAsync, addHabitAsync, toggleHabbitDateAsync } from "../../store/habits/thunks";
import dayjs from "dayjs";
import HeatMap from '@uiw/react-heat-map';

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
        let habitDate = dates.map((d) => {
            return { date: d, count: 1}
        })
        return habitDate
    }

    const getWidth = () => {

    }
    
    return (
        <>
        {habits.map((habit) => {
            return (
                <Card key={habit._id} className="shadow-xl shadow-pmd-blue-600 m-8">
                    <CardBody className="flex-1">
                        <Typography color="blue-gray" variant="h5">{habit.name}</Typography>
                        <br />
                        <HeatMap 
                            width={705}
                            value={parseHabitDates(habit.dates)}
                            startDate={new Date('2023/01/01')}
                            endDate={new Date('2023/12/31')}
                            legendCellSize={0}
                        />
                    </CardBody>
                </Card>
            )
        })}
        </>
    )
}

export default DetailedHabitsView