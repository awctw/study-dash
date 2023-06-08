import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Card,
  Dialog,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, editTODO } from "../../store/todoListSlice";

const EditTODO = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.todoReducer.categories);

  // controls the edit dialog popup
  const [openEdit, setOpen] = useState(false);

  const [title, setTitle] = useState(props.todo.title);
  const [dueDate, setDueDate] = useState(new Date(props.todo.dueDate));
  const [description, setDescription] = useState(props.todo.description);
  const [category, setCategory] = useState(props.todo.category);
  const [error, setError] = useState("");

  const handleOpen = React.useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
    setTitle(props.todo.title);
    setDueDate(new Date(props.todo.dueDate));
    setDescription(props.todo.description);
    setCategory(props.todo.category);
    setError("");
  }, [
    props.todo.title,
    props.todo.dueDate,
    props.todo.description,
    props.todo.category,
  ]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!title || !dueDate || !category) {
      setError("Please provide all required fields.");
      return;
    }

    const updatedTodo = {
      ...props.todo,
      title: title,
      dueDate: dueDate,
      description: description,
      category: category.toLowerCase(),
    };

    dispatch(editTODO(updatedTodo));

    // update the category list redux store if category does not already
    // exist in the array
    dispatch(addCategory(category));
    handleOpen();
  };

  const resetFormHandler = () => {
    setTitle("");
    setDueDate(null);
    setDescription("");
    setCategory("");
    setError("");
  };

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
            {error && <p className="error-msg">{error}</p>}
            <div className="EditTODOButtons">
              <Button color="light-blue" size="sm" type="submit">
                Confirm
              </Button>
              <Button color="gray" size="sm" onClick={resetFormHandler}>
                Clear
              </Button>
              <Button color="red" size="sm" onClick={handleOpen}>
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
