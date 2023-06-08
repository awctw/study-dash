import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import { deleteAllTODOs } from "../../store/todoListSlice";
import AddTODOItem from "./AddNewTODO";
import CategoryToggle from "./CategoryToggle";

// ControlPanel component provides functionalities for clearing all TODOItems,
// adding new TODOItems, and filtering TODOs by category.
const ControlPanel = ({ setSelectedCategory }) => {
  const dispatch = useDispatch();

  const handleClearTodos = React.useCallback(() => {
    dispatch(deleteAllTODOs());
  }, [dispatch]);

  return (
    <div className="m-7 border-black border-solid border-2 flex flex-col justify-evenly items-center p-8 rounded-xl">
      <Button
        className="border-indigo-300 bg-white text-indigo-300 border-solid border"
        id="clearAllButton"
        size="sm"
        onClick={handleClearTodos}
      >
        Clear All
      </Button>
      <AddTODOItem />
      <CategoryToggle handleCategoryChange={setSelectedCategory} />
    </div>
  );
};

export default ControlPanel;
