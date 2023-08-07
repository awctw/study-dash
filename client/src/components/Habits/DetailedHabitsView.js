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
import { getHabitsAsync } from "../../store/habits/thunks";
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

    const getStartDate = () => {
        const day = new Date()
        const oneYear = new Date(dayjs(day).subtract(1, 'year').format('YYYY/MM/DD'))
        return oneYear
    }

    const getEndDate = () => {
        const day = new Date()
        return day
    }
    
    return (
        <>
        {habits.map((habit) => {
            return (
                <Card key={habit._id} className="shadow-xl shadow-pmd-blue-600 m-8 min-w-[50rem]">
                    <CardBody className="flex-1">
                        <Typography color="blue-gray" variant="h5">{habit.name}</Typography>
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
            )
        })}
        </>
    )
}

export default DetailedHabitsView