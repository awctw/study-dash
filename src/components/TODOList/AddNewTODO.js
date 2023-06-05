import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import {Button, Card, Dialog, Input, Textarea} from "@material-tailwind/react";
import {addTODO} from "../../store/TODOListReducer";

const AddTODOItem = () => {
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todoReducer.TODOList);
    const categories = useSelector(state => state.todoReducer.categories)

    // controls the addTODO dialog popup
    const [openAddTODO, setOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    // Overwrites the current boolean value of openAddTODO with the opposite
    // value. This allows us to open the AddTODOItem dialog (openAddTODO: false -> true)
    // and also allows us to close the AddTODOItem dialog (openAddTODO: true -> false)
    const handleOpen = () => {
        setOpen(!openAddTODO);
        resetFormHandler();
    };

    const handleTitleInput = (e) => {
        setTitle(e.target.value);
    };

    const handleDueDateInput = (date) => {
        setDueDate(date);
    };

    const handleDescriptionInput = (e) => {
        setDescription(e.target.value);
    };

    const handleCategoryInput = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !dueDate || !description || !category) {
            setError('Please provide all required fields.');
            return;
        }

        const newTodo = {
            id: generateUniqueId(),
            title: title,
            dueDate: dueDate,
            description: description,
            category: category.toLowerCase(),
        };

        dispatch(addTODO(newTodo));
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

    const generateUniqueId = () => {
        const existingIds = todoList.map((todo) => todo.id);

        let newId;
        do {
            newId = Math.random().toString(36).slice(2, 11);
        } while (existingIds.includes(newId));

        return newId;
    };

    return (
        <>
            <Button id="AddNewTODOButton" color="light-green" size="sm" onClick={handleOpen}>Add New TODO</Button>
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
                            <label htmlFor="add-title">Title:</label>
                            <Input id="add-title"
                                   value={title}
                                   label="title"
                                   onChange={(edit) => handleTitleInput(edit)} />
                        </div>
                        <div className="inputField">
                            <label htmlFor="add-dueDate">Due Date:</label>
                            <DatePicker id="add-dueDate"
                                        selected={dueDate}
                                        onChange={(edit) => handleDueDateInput(edit)} />
                        </div>
                        <div className="inputField">
                            <label htmlFor="add-description">Description:</label>
                            <Textarea id="add-description"
                                      label="description"
                                      value={description}
                                      onChange={(edit) => handleDescriptionInput(edit)} />
                        </div>
                        <div className="inputField">
                            <label htmlFor="add-category">Category:</label>
                            <Input id="add-category"
                                   label="category"
                                   value={category}
                                   list="categoryOptions"
                                   onChange={(selection) => handleCategoryInput(selection)}/>
                            <datalist id="categoryOptions">
                                {categories.map((category) => (
                                    <option key={category} value={category}></option>
                                ))}
                            </datalist>
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                        <div className="AddTODOButtons">
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

export default AddTODOItem;
