import React from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import thunk from "../../store/TODOList/thunk";

const CategoryDelete = ({ category, setSelectedCategoryID }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const success = await dispatch(thunk.deleteCategoryAsync(category._id));
    if (success) {
      setSelectedCategoryID("");
    }
  };

  return (
    <>
      <Button
        size="sm"
        onClick={handleDelete}
        className="ml-8 border-indigo-300 bg-white text-indigo-300 border-solid border"
      >
        Delete
      </Button>
    </>
  );
};

export default CategoryDelete;
