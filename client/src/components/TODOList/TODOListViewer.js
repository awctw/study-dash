import React, { useEffect, useState } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
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
  const [loading, setLoading] = useState(false);

  // updates todoList in redux store from server whenever list is
  // updated
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

  // Only render the ListView if the isVisibleTODOListEmpty function returns false,
  // indicating that there are visible TODOItems to display. At least 1 rem of horizontal
  // spacing is guaranteed between "TODO List" and "Total Todos"
  return (
    <div>
      <header className="flex justify-between flex-wrap">
        <Typography className="mr-4" variant="h5">
          TODO List
        </Typography>
        <Typography variant="small" className="mt-1 text-green-600">
          Total Todos: {TODOList.length}
        </Typography>
      </header>
      {loading && <Spinner className="h-10 w-10" />}
      <ListView />
    </div>
  );
};

export default TODOListViewer;
