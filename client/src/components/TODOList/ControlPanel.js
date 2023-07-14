import React, { useEffect, useState } from "react";
import AddTODOItem from "./AddNewTODO";
import CategoryToggle from "./CategoryToggle";
import { useSelector } from "react-redux";
import { REQUEST_STATE } from "../../store/utils";

// ControlPanel component provides functionalities for clearing all TODOItems,
// adding new TODOItems, and filtering TODOs by category.
const ControlPanel = ({ setSelectedCategoryID }) => {
  const { error, deleteCategory } = useSelector((state) => state.todoReducer);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (deleteCategory === REQUEST_STATE.REJECTED && error) {
      setErrMessage(error);
    }
  }, [error, deleteCategory]);

  return (
    <>
      {errMessage && (
        <p className="error-msg flex flex-row justify-center mt-4">
          {errMessage}
        </p>
      )}
      <div className="flex flex-row justify-center flex-wrap p-3">
        <AddTODOItem />
        <CategoryToggle
          setSelectedCategoryID={setSelectedCategoryID}
          setErrMessage={setErrMessage}
        />
      </div>
    </>
  );
};

export default ControlPanel;
