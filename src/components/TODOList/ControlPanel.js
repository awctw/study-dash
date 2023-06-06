import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import AddTODOItem from "./AddNewTODO";
import {Button, Option, Select} from "@material-tailwind/react";
import {deleteAllTODOs} from "../../store/TODOList_Slice";

const ControlPanel = (props) => {
    const categories = useSelector(state => state.todoReducer.categories);
    const dispatch = useDispatch();

    const handleCategoryChange = (selection) => {
        props.setSelectedCategory(selection);
    };

    const handleClearTodos = () => {
        // Logic for clearing all TODOs
        dispatch(deleteAllTODOs());
    };

    return (
        <div className="control-panel">
            <Button id="clearAllButton" color="orange" size="sm" onClick={handleClearTodos}>Clear all TODOs</Button>
            <AddTODOItem />
            <Select id="categoryFilter" label="Search by Category" onChange={(selection) => handleCategoryChange(selection)}>
                <Option value="">All Categories</Option>
                {categories.map((category) => (
                    <Option key={category} value={category}>
                        {category}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default ControlPanel;
