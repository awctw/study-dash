import React from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import thunk from "../../store/TODOList/thunk";
import { REQUEST_STATE } from "../../store/utils";

const CategoryDelete = ({ category, setSelectedCategoryID }) => {
  const { deleteCategory } = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const success = await dispatch(thunk.deleteCategoryAsync(category._id));
    if (success) {
      setSelectedCategoryID("");
    }
  };

  return (
    <>
      <Button color="red" size="sm" onClick={handleDelete} className="ml-8">
        {deleteCategory === REQUEST_STATE.PENDING && (
          <Spinner className="h-5 w-5" />
        )}
        Delete
      </Button>
    </>
  );
};

export default CategoryDelete;
