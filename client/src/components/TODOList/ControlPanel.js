import React, { useEffect, useState } from "react";
import AddTODOItem from "./AddNewTODO";
import CategoryToggle from "./CategoryToggle";
import { useSelector } from "react-redux";
import { REQUEST_STATE } from "../../store/utils";
import { Alert } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

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
        <Alert
          variant="ghost"
          color="red"
          icon={<ExclamationCircleIcon className="w-6 h-6" />}
          className="items-center my-2"
        >
          {errMessage}
        </Alert>
      )}
      <div className="items-center flex flex-row justify-center">
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
