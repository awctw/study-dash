import React, { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";
import thunk from "../../store/TODOList/thunk";
import TODOCalendarIcon from "./TODOCalendarIcon";

// Renders a Calendar view of all the TODOItems created. Each TODOItem
// is added to a Calendar "Date" tile based upon its startDate attribute.
const TODOCalendarView = ({ selectedCategoryID }) => {
  const { TODOList, fetchTODOList } = useSelector((state) => state.todoReducer);
  const user = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  // Fetch TODOList from Redux store whenever list is updated
  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(
        thunk.getTODOListAsync({
          userID: user.user.userID,
          categoryID: selectedCategoryID,
        })
      );
    }
  }, [dispatch, fetchTODOList, selectedCategoryID, user]);

  // Determines which TODOItems belong to a given "date" cell based
  // their "start date" attribute
  const findTODOsThatBelongToGivenDate = (date) => {
    return TODOList.filter((todo) => {
      // convert "startDate" date string into Date object
      const startDate = new Date(todo.startDate);

      return (
        startDate.getFullYear() === date.getFullYear() &&
        startDate.getMonth() === date.getMonth() &&
        startDate.getDate() === date.getDate()
      );
    });
  };

  // For items whose "startDate" attribute matches the
  // current "date" tile, convert each of those items into TODOItem
  // components and add them into the given "date" tile of the
  // Calendar.
  const populateDateTileWithTODOs = ({ date }) => {
    const TODOsForGivenDate = findTODOsThatBelongToGivenDate(date);

    // check whether there are more than zero TODOItems whose start date
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

  return (
    <div className="flex flex-col items-center mx-2">
      <Calendar
        className="rounded-lg borders custom-no-underline"
        tileContent={populateDateTileWithTODOs}
      />
      <style>
        {`
          .custom-no-underline .react-calendar__month-view__weekdays__weekday abbr {
            text-decoration: none;
          }
        `}
      </style>
    </div>
  );
};

export default TODOCalendarView;
