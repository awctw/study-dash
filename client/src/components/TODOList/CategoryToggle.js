import React from "react";
import { Button, Option, Select } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../store/todoListSlice";

// CategoryToggle provides a dropdown menu for selecting a specific category to filter
// TODOItems by category. handleCategoryChange() handles the
// change event of the dropdown and performs the filtering logic.
function CategoryToggle({ handleCategoryChange }) {
  const categories = useSelector((state) => state.todoReducer.categories);
  const dispatch = useDispatch();

  const handleDelete = (category) => {
    dispatch(deleteCategory(category));
  };

  return (
    <div className="m-2 w-60">
      <Select
        id="categoryFilter"
        label="Search by Category"
        onChange={handleCategoryChange}
      >
        <Option value="">All Categories</Option>
        {categories.map((category) => (
          <Option key={category} value={category}>
            <div className="categoryOption flex flex-row justify-around">
              {category}
              <Button
                color="red"
                size="sm"
                onClick={() => handleDelete(category)}
              >
                Delete
              </Button>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default CategoryToggle;
