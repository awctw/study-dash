import React from "react";
import { IconButton } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import thunk from "../../store/TODOList/thunk";
import { TrashIcon } from "@heroicons/react/20/solid";

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
      <IconButton
        variant="text"
        size="sm"
        color="blue-gray"
        className="p-0 m-0"
        onClick={handleDelete}
      >
        <TrashIcon className="h-4 w-4 p-0" />
      </IconButton>
    </>
  );
};

export default CategoryDelete;
