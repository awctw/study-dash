import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import {
  Button,
  Card,
  Dialog,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { addCategory, addTODO } from "../../store/todoListSlice";

// AddTODOItem component provides a form to add new TODOItems
const AddTODOItem = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.todoReducer.categories);

  // openAddTODO is used to control the visibility of the addTODO dialog popup.
  const [openAddTODO, setOpen] = useState(false);

  // formData state variable is used to store the values entered in the form.
  const [formData, setFormData] = useState({
    title: "",
    dueDate: null,
    description: "",
    category: "",
  });

  const [error, setError] = useState("");

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

  // handleDueDateInput function is responsible for updating the dueDate field
  // in the formData state when the value of the DatePicker component changes.
  const handleDueDateInput = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dueDate: date,
    }));
  };

  // The handleSubmit function is called when the form is submitted.
  // It performs validation on the input fields to ensure that the required
  // fields are not empty. If any of the required fields are empty, an error
  // message is set in the error state variable.
  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, dueDate, description, category } = formData;

    if (!title || !dueDate || !description || !category) {
      setError("Please provide all required fields.");
      return;
    }

    const newTodo = {
      title,
      dueDate,
      description,
      category,
    };

    dispatch(addTODO(newTodo));

    // The addCategory action is dispatched to update the category list
    // in the Redux store if the category value does not already exist in the categories array.
    dispatch(addCategory(category));
    handleOpen();
  };

  const resetFormHandler = () => {
    setFormData({
      title: "",
      dueDate: null,
      description: "",
      category: "",
    });
    setError("");
  };

  return (
    <>
      <Button
        id="AddNewTODOButton"
        className="bg-indigo-300 text-white"
        size="sm"
        onClick={handleOpen}
      >
        Add
      </Button>
      <Dialog
        size="lg"
        open={openAddTODO}
        handler={handleOpen}
        className="addTODODialog shadow-none"
      >
        <Card className="addTODOForm">
          <h2>Add TODO Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputField">
              <label htmlFor="add-title">TODO:</label>
              <Input
                id="add-title"
                name="title"
                value={formData.title}
                label="title"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <label htmlFor="add-dueDate">Due Date:</label>
              <DatePicker
                id="add-dueDate"
                selected={formData.dueDate}
                onChange={handleDueDateInput}
              />
            </div>
            <div className="inputField">
              <label htmlFor="add-description">Description:</label>
              <Textarea
                id="add-description"
                name="description"
                label="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputField">
              <label htmlFor="add-category">Category:</label>
              <Input
                id="add-category"
                name="category"
                label="category"
                value={formData.category}
                list="categoryOptions"
                onChange={handleInputChange}
              />
              <datalist id="categoryOptions">
                {categories.map((category) => (
                  <option key={category} value={category}></option>
                ))}
              </datalist>
            </div>
            {error && <p className="error-msg">{error}</p>}
            <div className="AddTODOButtons">
              <Button color="light-blue" size="sm" type="submit">
                Confirm
              </Button>
              <Button
                color="gray"
                size="sm"
                type="reset"
                onClick={resetFormHandler}
              >
                Clear
              </Button>
              <Button color="red" size="sm" type="button" onClick={handleOpen}>
                Close
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  );
};

export default AddTODOItem;
