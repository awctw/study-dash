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
  const { user } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // updates todoList in redux store from server whenever list is
  // updated
  useEffect(() => {
    setLoading(true);
    dispatch(thunk.getTODOListAsync(user.userID, selectedCategoryID)).then(
      () => {
        setLoading(false);
      }
    );
  }, [dispatch, fetchTODOList, selectedCategoryID, user.userID]);

  // Only render the ListView if the isVisibleTODOListEmpty function returns false,
  // indicating that there are visible TODOItems to display.
  return (
    <div>
      <header className="flex justify-between">
        <Typography variant="h5">TODO List</Typography>
        <Typography variant="small">Total Todos: {TODOList.length}</Typography>
      </header>
      {loading && <Spinner className="h-10 w-10" />}
      <ListView />
    </div>
  );
};

export default TODOListViewer;
