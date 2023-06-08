import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Option, Select } from "@material-tailwind/react";
import { deleteAllTODOs } from "../../store/todoListSlice";
import AddTODOItem from "./AddNewTODO";

const ControlPanel = ({ setSelectedCategory }) => {
  const categories = useSelector((state) => state.todoReducer.categories);
  const dispatch = useDispatch();

  // wrap the handleClearTodos function inside a useCallback hook to ensure
  // that the function reference remains the same unless its dependencies change:
  const handleClearTodos = React.useCallback(() => {
    dispatch(deleteAllTODOs());
  }, [dispatch]);

  const handleCategoryChange = (selection) => {
    setSelectedCategory(selection);
  };

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
      <Select
        id="categoryFilter"
        label="Search by Category"
        onChange={handleCategoryChange}
      >
        <Option value="">All Categories</Option>
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ControlPanel;
