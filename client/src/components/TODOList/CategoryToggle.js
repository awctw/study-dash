import React, { useEffect, useState } from "react";
import { Option, Select, Spinner } from "@material-tailwind/react";
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
  const [loading, setLoading] = useState(false);

  // updates category list in redux store from server whenever list is
  // updated
  useEffect(() => {
    setLoading(true);
    dispatch(thunk.getCategoryListAsync(user.user.userID)).then(() => {
      setLoading(false);
    });
  }, [dispatch, fetchCategoryList, user.user.userID]);

  const handleCategorySelection = (selectedID) => {
    setSelectedCategoryID(selectedID);
    setErrMessage("");
  };

  return (
    <div className="mt-4 w-[13rem]">
      {loading && <Spinner className="h-10 w-10" />}
      <Select
        id="categoryFilter"
        label="Search by Category"
        onChange={handleCategorySelection}
      >
        <Option value="">All Categories</Option>
        {categories.map((category) => (
          <Option
            key={category._id}
            value={category._id}
            className="flex flex-row justify-between flex-wrap"
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
