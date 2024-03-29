import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import thunk from "../../store/TODOList/thunk";
import { REQUEST_STATE } from "../../store/utils";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";

// AddTODOItem component provides a form to add new TODOItems
const AddTODOItem = () => {
  const dispatch = useDispatch();
  const { addTODOItem, error, categories } = useSelector(
    (state) => state.todoReducer
  );

  // The current logged-in user of the application.
  // This is where we obtain the userID attribute
  const user = useSelector((state) => state.loginReducer);

  // openAddTODO is used to control the visibility of the addTODO dialog popup.
  const [openAddTODO, setOpen] = useState(false);

  // formData state variable is used to store the values entered in the form.
  const [formData, setFormData] = useState({
    title: "",
    startDate: null,
    endDate: null,
    description: "",
    category: "",
  });

  const [errMessage, setErrMessage] = useState("");

  const handleOpen = () => {
    setOpen(!openAddTODO);
    resetFormHandler();
  };

  // Create a single reusable function to handle the input changes for all attributes
  // apart from dueDate.
  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // handleStartDateInput function is responsible for updating the startDate field
  // in the formData state when the value of the DatePicker component changes.
  const handleStartDateInput = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: date,
    }));
  };

  // handleEndDateInput function is responsible for updating the endDate field
  // in the formData state when the value of the DatePicker component changes.
  const handleEndDateInput = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      endDate: date,
    }));
  };

  // The handleSubmit function is called when the form is submitted.
  // It performs validation on the input fields to ensure that the required
  // fields are not empty. If any of the required fields are empty, an error
  // message is set in the error state variable.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, startDate, endDate, description, category } = formData;

    if (!title || !startDate || !endDate || !description || !category) {
      setErrMessage("Please provide all required fields.");
      return;
    }

    const newTodo = {
      title: title,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      description: description,
      category: category,
      isFinished: false,
      userID: user.user.userID,
    };

    const success = await dispatch(thunk.addTODOItemAsync(newTodo));

    if (success) {
      setOpen(!openAddTODO);
    }
  };

  const resetFormHandler = () => {
    setFormData({
      title: "",
      startDate: null,
      endDate: null,
      description: "",
      category: "",
    });
    setErrMessage("");
  };

  useEffect(() => {
    if (addTODOItem === REQUEST_STATE.FULFILLED) {
      resetFormHandler();
    }

    if (addTODOItem === REQUEST_STATE.REJECTED && error) {
      setErrMessage(error);
    }
  }, [addTODOItem, error]);

  return (
    <>
      <Tooltip content={"Add a todo!"} placement="left">
        <IconButton
          id="AddNewTODOButton"
          className="bg-indigo-50 text-indigo-300 shadow-none hover:shadow-none mx-3 mt-8"
          size="md"
          onClick={handleOpen}
        >
          <PlusIcon className="h-6 w-6" />
        </IconButton>
      </Tooltip>
      <Dialog
        size="sm"
        open={openAddTODO}
        handler={handleOpen}
        className="shadow-none"
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <Typography className="text-2xl font-semibold text-blue-gray-900">
            Add TODO Item
          </Typography>
          <IconButton
            size="sm"
            type="button"
            color="blue-gray"
            variant="text"
            onClick={handleOpen}
          >
            <XMarkIcon className="w-5 h-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody divider className="border-b-0">
          <form
            className="flex flex-col justify-evenly h-[30rem] overflow-y-auto"
            onSubmit={handleSubmit}
          >
            <div className="inputField">
              <Input
                name="title"
                value={formData.title}
                label="Title"
                color="indigo"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-row justify-between flex-wrap">
              <div className="inputField mr-4">
                <label htmlFor="add-startDate">Start:</label>
                <DatePicker
                  id="add-startDate"
                  className="bg-indigo-50 rounded p-1 ml-1"
                  dateFormat="MMM-dd-yyyy, h:mm aa"
                  showTimeInput
                  timeInputLabel="Time (hh:mm:AM/PM):"
                  selected={formData.startDate}
                  onChange={handleStartDateInput}
                  // the most recent (inclusive) Date value that the user
                  // can select for "Start Date"
                  maxDate={formData.endDate}
                />
              </div>
              <div className="inputField">
                <label htmlFor="add-endDate">Due:</label>
                <DatePicker
                  id="add-endDate"
                  className="bg-indigo-50 rounded p-1 ml-1"
                  dateFormat="MMM-dd-yyyy, h:mm aa"
                  showTimeInput
                  timeInputLabel="Time (hh:mm:AM/PM):"
                  selected={formData.endDate}
                  onChange={handleEndDateInput}
                  // the oldest (inclusive) Date value that the user
                  // can select for "End Date"
                  minDate={formData.startDate}
                />
              </div>
            </div>
            <div className="inputField">
              <Textarea
                name="description"
                label="Description"
                color="indigo"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <Input
                name="category"
                label="Category"
                autoComplete="off"
                color="indigo"
                value={formData.category}
                list="categoryOptions"
                onChange={handleInputChange}
              />
              <datalist id="categoryOptions">
                {categories.map((category) => (
                  <option key={category._id} value={category.category}></option>
                ))}
              </datalist>
            </div>

            {errMessage && (
              <p className="error-msg flex flex-row justify-center">
                {errMessage}
              </p>
            )}

            <div className="flex flex-row gap-2 items-center flex-wrap">
              <Button
                className="flex items-center text-white bg-indigo-300 hover:shadow-none"
                size="sm"
                type="submit"
              >
                Confirm
              </Button>
              <Button
                size="sm"
                variant="text"
                color="blue-gray"
                className="flex items-center mr-2 border text-indigo-300 border-indigo-300"
                type="reset"
                onClick={resetFormHandler}
              >
                Clear
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default AddTODOItem;
