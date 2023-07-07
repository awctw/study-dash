import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Card,
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
  });

  // Assign red to the AM time options in DatePicker.
  // Assign green to the PM values of the time menu
  const assignTimeColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

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

  // The handleFormSubmit function is called when the form is submitted.
  // It performs validation on the input fields to ensure that the required
  // fields are not empty. If any of the required fields are empty, an error
  // message is set in the error state variable.
  const handleFormSubmit = async (e) => {
    // added to prevent edit input form from being submitted
    // prior to input validation
    e.preventDefault();

    const { title, startDate, endDate, description, category } = formData;

    if (!title || !startDate || !endDate || !description || !category) {
      setErrMessage("Please provide all required fields.");
      return;
    }

    const updatedTodo = {
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      category: category,
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
    });
    setErrMessage("");
  };

  useEffect(() => {
    if (getTODOItem === REQUEST_STATE.FULFILLED && currentTODOItem) {
      setFormData({
        title: currentTODOItem.title,
        startDate: currentTODOItem.startDate,
        endDate: currentTODOItem.endDate,
        description: currentTODOItem.description,

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
      <Button onClick={handleOpen} className="bg-indigo-300">
        Details
      </Button>
      <Dialog
        size="lg"
        open={openEdit}
        handler={handleOpen}
        className="shadow-none"
      >
        <Card className="editTODOForm">
          <h2>Edit TODO</h2>
          <form className="TODOForm" onSubmit={handleFormSubmit}>
            <div className="inputField">
              <label htmlFor="edit-title">Title:</label>
              <Input
                id="edit-title"
                value={formData.title}
                label="title"
                name="title"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <label htmlFor="edit-startDate">Start Date:</label>
              <DatePicker
                id="edit-startDate"
                name="startDate"
                className="bg-orange-200"
                showTimeSelect
                selected={formData.startDate}
                onChange={handleStartDateInput}
                timeClassName={assignTimeColor}
              />
            </div>
            <div className="inputField">
              <label htmlFor="edit-endDate">End Date:</label>
              <DatePicker
                id="edit-endDate"
                name="endDate"
                className="bg-orange-200"
                showTimeSelect
                selected={formData.endDate}
                onChange={handleEndDateInput}
                timeClassName={assignTimeColor}
              />
            </div>
            <div className="inputField">
              <label htmlFor="edit-description">Description:</label>
              <Textarea
                id="edit-description"
                label="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <label htmlFor="edit-category">Category:</label>
              <Input
                id="edit-category"
                label="category"
                name="category"
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
            {errMessage && <p className="error-msg">{errMessage}</p>}

            <div className="EditTODOButtons">
              <Button color="light-blue" size="sm" type="submit">
                Confirm
              </Button>
              <Button color="gray" size="sm" onClick={resetFormHandler}>
                Clear
              </Button>
              <Button color="red" size="sm" onClick={handleClose}>
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
