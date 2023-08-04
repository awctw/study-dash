import React, { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import ListView from "./ListView";
import { useDispatch, useSelector } from "react-redux";
import thunk from "../../store/TODOList/thunk";

const TODOListViewer = ({ selectedCategoryID }) => {
  // The useSelector hook extracts the TODOList array from the todoListSlice
  // slice in the rootReducer. TODOList is already sorted by due-date in
  // the server
  const { TODOList, fetchTODOList } = useSelector((state) => state.todoReducer);
  const user = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  // updates todoList in redux store from server whenever list is
  // updated
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

  // Only render the ListView if the isVisibleTODOListEmpty function returns false,
  // indicating that there are visible TODOItems to display. At least 1 rem of horizontal
  // spacing is guaranteed between "TODO List" and "Total Todos"
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-start justify-between p-3 pb-0">
        <Typography className="text-black" variant="h5">
          TODO List
        </Typography>
        <Typography variant="small" className="mt-1 text-black">
          Total Todos: {TODOList.length}
        </Typography>
      </div>
      <ListView />
    </div>
  );
};

export default TODOListViewer;
