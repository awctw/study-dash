import React, { useEffect } from "react";
import { Option, Select } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import thunk from "../../store/TODOList/thunk";
import CategoryDelete from "./CategoryDelete";

// CategoryToggle provides a dropdown menu for selecting a specific category to filter
// TODOItems by category. handleCategoryChange() handles the
// change event of the dropdown and performs the filtering logic.
function CategoryToggle({ setSelectedCategoryID, setErrMessage }) {
  const { categories, fetchCategoryList } = useSelector(
    (state) => state.todoReducer
  );

  const user = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  // updates category list in redux store from server whenever list is
  // updated
  useEffect(() => {
    dispatch(thunk.getCategoryListAsync(user.user.userID));
  }, [dispatch, fetchCategoryList, user.user.userID]);

  const handleCategorySelection = (selectedID) => {
    setSelectedCategoryID(selectedID);
    setErrMessage("");
  };

  return (
    <div className="mt-4 w-[13rem]">
      <Select
        id="categoryFilter"
        label="Select by Category"
        onChange={handleCategorySelection}
      >
        <Option value="" className="pl-2 py-[0.65rem] pr-1">
          All Categories
        </Option>
        {categories.map((category) => (
          <Option
            key={category._id}
            value={category._id}
            className="flex flex-row justify-between flex-wrap items-center pl-2 py-1 pr-1 my-1"
          >
            {category.category}
            <CategoryDelete
              category={category}
              setSelectedCategoryID={setSelectedCategoryID}
            />
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default CategoryToggle;
