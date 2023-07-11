import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  Input,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import thunk from "../../store/TODOList/thunk";
import { REQUEST_STATE } from "../../store/utils";

// The EditTODO component allows users to edit the properties of a TODOItem
// through a dialog popup.
const EditTODO = ({ todo }) => {
  const dispatch = useDispatch();
  const { getTODOItem, currentTODOItem, error, categories } = useSelector(
    (state) => state.todoReducer
  );

  // The current logged-in user of the application.
  // This is where we obtain the userID attribute
  const user = useSelector((state) => state.loginReducer);

  // openEdit state controls the visibility of the edit dialog popup.
  const [openEdit, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // formData state variable is used to store the values entered in the form.
  const [formData, setFormData] = useState({
    title: "",
    startDate: null,
    endDate: null,
    description: "",
    category: "",
    isFinished: false,
  });

  const [errMessage, setErrMessage] = useState("");

  // handleOpen toggles the value of openEdit, which controls the visibility
  // of the edit dialog popup. It also sets the initial values of the input fields
  // and clears the error message.
  const handleOpen = async () => {
    setLoading(true);
    const success = await dispatch(thunk.getTODOItemAsync(todo._id));
    setLoading(false);
    if (success) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setErrMessage("");
    setOpen(false);
  };

  // Function to handle the input changes for all attributes
  const handleInputChange = (e) => {
    // e.target.name is referring to the "name" value of each Input component
    // in the form below
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

  // handleIsFinishedInput function is responsible for updating the isFinished field
  // in the formData state when the value of the CheckBox component changes.
  const handleIsFinishedInput = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isFinished: event.target.checked,
    }));
  };

  // The handleFormSubmit function is called when the form is submitted.
  // It performs validation on the input fields to ensure that the required
  // fields are not empty. If any of the required fields are empty, an error
  // message is set in the error state variable.
  const handleFormSubmit = async (e) => {
    // added to prevent edit input form from being submitted
    // prior to input validation
    e.preventDefault();

    const { title, startDate, endDate, description, category, isFinished } =
      formData;

    let isFinishedVal = false;

    if (isFinished) {
      isFinishedVal = isFinished;
    }

    if (!title || !startDate || !endDate || !description || !category) {
      setErrMessage("Please provide all required fields.");
      return;
    }

    const updatedTodo = {
      title: title,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      description: description,
      isFinished: isFinishedVal,
      category: category,
      userID: user.user.userID,
    };

    setLoading(true);
    const success = await dispatch(
      thunk.editTODOItemAsync({
        itemID: currentTODOItem._id,
        item: updatedTodo,
      })
    );
    setLoading(false);

    if (success) {
      setOpen(false);
    }
  };

  const resetFormHandler = () => {
    setFormData({
      title: "",
      startDate: null,
      endDate: null,
      description: "",
      category: "",
      isFinished: false,
    });
    setErrMessage("");
  };

  useEffect(() => {
    if (getTODOItem === REQUEST_STATE.FULFILLED && currentTODOItem) {
      setFormData({
        title: currentTODOItem.title,
        startDate: new Date(currentTODOItem.startDate),
        endDate: new Date(currentTODOItem.endDate),
        description: currentTODOItem.description,
        isFinished: currentTODOItem.isFinished,

        // currentTODOItem only stores a reference to a Category
        // object. The actual Category object has its value
        // stored within the "category" field. To access the
        // Category value we do currentTODOItem.category.category
        category: currentTODOItem.category.category,
      });
    }

    if (getTODOItem === REQUEST_STATE.REJECTED && error) {
      setErrMessage(error);
    }
  }, [currentTODOItem, error, getTODOItem]);

  return (
    <>
      <Button onClick={handleOpen} className="bg-indigo-300 mb-4">
        Details
      </Button>
      <Dialog
        size="lg"
        open={openEdit}
        handler={handleOpen}
        className="shadow-none"
      >
        <Card className="m-4">
          <h2 className="flex flex-row justify-center">Edit TODO</h2>
          <form
            className="flex flex-col justify-evenly h-[30rem] overflow-y-auto"
            onSubmit={handleFormSubmit}
          >
            <div className="inputField">
              <Input
                value={formData.title}
                label="Title"
                name="title"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-row justify-between flex-wrap">
              <div className="inputField">
                <label htmlFor="edit-startDate">Start Date:</label>
                <DatePicker
                  id="edit-startDate"
                  className="bg-orange-200 w-[12rem]"
                  dateFormat="MMM-dd-yyyy, h:mm aa"
                  showTimeInput
                  timeInputLabel="Time:"
                  selected={formData.startDate}
                  onChange={handleStartDateInput}
                />
              </div>
              <div className="inputField">
                <label htmlFor="edit-endDate">End Date:</label>
                <DatePicker
                  id="edit-endDate"
                  className="bg-orange-200 w-[12rem]"
                  dateFormat="MMM-dd-yyyy, h:mm aa"
                  showTimeInput
                  timeInputLabel="Time:"
                  selected={formData.endDate}
                  onChange={handleEndDateInput}
                />
              </div>
            </div>
            <div className="inputField">
              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <Checkbox
                label="Is TODO item finished?"
                checked={formData.isFinished}
                onChange={handleIsFinishedInput}
              />
            </div>
            <div className="inputField">
              <Input
                label="Category"
                name="category"
                autoComplete="off"
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

            {loading && <Spinner className="h-10 w-10" />}
            {errMessage && (
              <p className="error-msg flex flex-row justify-center">
                {errMessage}
              </p>
            )}

            <div className="flex flex-row justify-evenly flex-wrap">
              <Button
                className="mb-4"
                color="light-blue"
                size="sm"
                type="submit"
              >
                Confirm
              </Button>
              <Button
                className="mb-4"
                color="gray"
                size="sm"
                onClick={resetFormHandler}
              >
                Clear
              </Button>
              <Button
                className="mb-4"
                color="red"
                size="sm"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  );
};

export default EditTODO;
