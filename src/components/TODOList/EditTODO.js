import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Button,
    Card,
    Dialog, Input, Textarea,
} from "@material-tailwind/react";
import {useDispatch, useSelector} from "react-redux";
import {editTODO} from "../../store/TODOList_Slice";

const EditTODO = (props) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.todoReducer.categories);

    // controls the edit dialog popup
    const [openEdit, setOpen] = useState(false);

    const [title, setTitle] = useState(props.todo.title);
    const [dueDate, setDueDate] = useState(new Date(props.todo.dueDate));
    const [description, setDescription] = useState(props.todo.description);
    const [category, setCategory] = useState(props.todo.category);
    const [error, setError] = useState('');

    // Overwrites the current boolean value of openEdit with the opposite
    // value. This allows us to open and close the EditTODO dialog.
    // Finally, also repopulates the input boxes of edit form with existing attributes
    // of current TODOItem
    const handleOpen = () => {
        setOpen(!openEdit)
        setTitle(props.todo.title);
        setDueDate(new Date(props.todo.dueDate));
        setDescription(props.todo.description);
        setCategory(props.todo.category);
        setError('');
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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Perform validation
        if (!title || !dueDate || !category || !category) {
            setError('Please provide all required fields.');
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
        handleOpen();
    };

    // Clear the input values and error message after clicking the
    // "Clear" button
    const resetFormHandler = () => {
        setTitle('');
        setDueDate(null);
        setDescription('');
        setCategory('');
        setError('');
    }

    return (
        <>
            <Button onClick={handleOpen}>Details</Button>
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
                            <Input id="edit-title"
                                   value={title}
                                   label="title"
                                   onChange={(edit) => handleTitleChange(edit)}
                            />
                        </div>
                        <div className="inputField">
                            <label htmlFor="edit-dueDate">Due Date:</label>
                            <DatePicker id="edit-dueDate"
                                        selected={dueDate}
                                        onChange={(edit) => handleDueDateChange(edit)} />
                        </div>
                        <div className="inputField">
                            <label htmlFor="edit-description">Description:</label>
                            <Textarea id="edit-description"
                                      label="description"
                                      value={description}
                                      onChange={(edit) => handleDescriptionChange(edit)} />
                        </div>
                        <div className="inputField">
                            <label htmlFor="edit-category">Category:</label>
                            <Input id="edit-category"
                                   label="category"
                                   value={category}
                                   list="categoryOptions"
                                   onChange={(selection) => handleCategoryChange(selection)}/>
                            <datalist id="categoryOptions">
                                {categories.map((category) => (
                                    <option key={category} value={category}></option>
                                ))}
                            </datalist>
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                        <div className="EditTODOButtons">
                            <Button color="light-blue" size="sm" type="submit">Confirm</Button>
                            <Button color="gray" size="sm" type="reset" onClick={resetFormHandler}>
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

export default EditTODO;
