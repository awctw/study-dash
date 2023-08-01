import React, { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";
import thunk from "../../store/TODOList/thunk";
import TODOCalendarIcon from "./TODOCalendarIcon";

// Renders a Calendar view of all the TODOItems created. Each TODOItem
// is added to a Calendar "Date" tile based upon its endDate attribute.
const TODOCalendarView = ({ selectedCategoryID }) => {
  const { TODOList, fetchTODOList } = useSelector((state) => state.todoReducer);
  const user = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // flag showing whether current "Date" tile is selected or not
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch TODOList from Redux store whenever list is updated
  useEffect(() => {
    setLoading(true);
    if (user.isLoggedIn) {
      dispatch(
        thunk.getTODOListAsync({
          userID: user.user.userID,
          categoryID: selectedCategoryID,
        })
      ).then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, fetchTODOList, selectedCategoryID, user]);

  // Determines which TODOItems belong to a given "date" cell based
  // their "end date" attribute
  const findTODOsThatBelongToGivenDate = (date) => {
    return TODOList.filter((todo) => {
      // convert "endDate" date string into Date object
      const endDate = new Date(todo.endDate);

      return (
        endDate.getFullYear() === date.getFullYear() &&
        endDate.getMonth() === date.getMonth() &&
        endDate.getDate() === date.getDate()
      );
    });
  };

  // For items whose "endDate" attribute matches the
  // current "date" tile, convert each of those items into TODOItem
  // components and add them into the given "date" tile of the
  // Calendar.
  const populateDateTileWithTODOs = ({ date }) => {
    const TODOsForGivenDate = findTODOsThatBelongToGivenDate(date);

    // check whether there are more than zero TODOItems whose end date
    // matches the current "Date" tile of the Calendar
    const isNumTODOMoreThanZero = TODOsForGivenDate.length > 0;

    return (
      <>
        {isNumTODOMoreThanZero && (
          <div className="w-4">
            <TODOCalendarIcon TODOList={TODOsForGivenDate} />
          </div>
        )}
      </>
    );
  };

  // Handle click events on each date tile
  const handleDateClick = (date) => {
    // Check if the clicked date is the same as the
    // currently selected date tile of the Calendar
    if (
      selectedDate &&
      selectedDate.getFullYear() === date.getFullYear() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getDate() === date.getDate()
    ) {
      // If it is, remove the Orange selection colour by setting the
      // selectedDate to null
      setSelectedDate(null);
    } else {
      // If it's a different date, update the selectedDate
      // to the clicked date
      setSelectedDate(date);
    }
  };

  return (
    <div className="mt-4">
      {loading && <Spinner className="h-10 w-10" />}
      <Calendar
        tileContent={populateDateTileWithTODOs}
        onClickDay={handleDateClick}
        value={selectedDate}
      />
    </div>
  );
};

export default TODOCalendarView;
