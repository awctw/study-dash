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

  // state variables that store the current values for the input fields and error messages.
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [errMessage, setErrMessage] = useState("");

  // handleOpen toggles the value of openEdit, which controls the visibility
  // of the edit dialog popup. It also sets the initial values of the input fields
  // and clears the error message.
  const handleOpen = () => {
    setLoading(true);
    dispatch(thunk.getTODOItemAsync(todo.id));
    setLoading(false);
    setOpen(true);
  };

  const handleClose = () => {
    setErrMessage("");
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // The handleFormSubmit function is called when the form is submitted.
  // It performs validation on the input fields to ensure that the required
  // fields are not empty. If any of the required fields are empty, an error
  // message is set in the error state variable.
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title || !dueDate || !description || !category) {
      setErrMessage("Please provide all required fields.");
      return;
    }

    const updatedTodo = {
      title: title,
      dueDate: dueDate.toDateString(),
      description: description,
      category: category,
    };

    setLoading(true);
    const success = await dispatch(
      thunk.editTODOItemAsync({
        itemID: currentTODOItem.id,
        item: updatedTodo,
      })
    );
    setLoading(false);

    if (success) {
      setOpen(false);
    }
  };

  const resetFormHandler = () => {
    setTitle("");
    setDueDate(null);
    setDescription("");
    setCategory("");
    setErrMessage("");
  };

  useEffect(() => {
    if (getTODOItem === REQUEST_STATE.FULFILLED && currentTODOItem) {
      setTitle(currentTODOItem.title);
      setDescription(currentTODOItem.description);
      setDueDate(new Date(currentTODOItem.dueDate));
      setCategory(currentTODOItem.category);
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
                value={title}
                label="title"
                onChange={handleTitleChange}
              />
            </div>
            <div className="inputField">
              <label htmlFor="edit-dueDate">Due Date:</label>
              <DatePicker
                id="edit-dueDate"
                className="bg-orange-200"
                selected={dueDate}
                onChange={handleDueDateChange}
              />
            </div>
            <div className="inputField">
              <label htmlFor="edit-description">Description:</label>
              <Textarea
                id="edit-description"
                label="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="inputField">
              <label htmlFor="edit-category">Category:</label>
              <Input
                id="edit-category"
                label="category"
                value={category}
                list="categoryOptions"
                onChange={handleCategoryChange}
              />
              <datalist id="categoryOptions">
                {categories.map((category) => (
                  <option key={category} value={category}></option>
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
