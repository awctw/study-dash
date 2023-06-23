import React, { useEffect, useState } from "react";
import { Button, Option, Select, Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import thunk from "../../store/TODOList/thunk";

// CategoryToggle provides a dropdown menu for selecting a specific category to filter
// TODOItems by category. handleCategoryChange() handles the
// change event of the dropdown and performs the filtering logic.
function CategoryToggle({ handleCategoryChange }) {
  const { categories, fetchCategoryList } = useSelector(
    (state) => state.todoReducer
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // updates category list in redux store from server whenever list is
  // updated
  useEffect(() => {
    setLoading(true);
    dispatch(thunk.getCategoryListAsync()).then(() => {
      setLoading(false);
    });
  }, [dispatch, fetchCategoryList]);

  const handleDelete = (category) => {
    dispatch(thunk.deleteCategoryAsync(category));
  };

  return (
    <div className="m-2 w-60">
      {loading && <Spinner className="h-10 w-10" />}
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
