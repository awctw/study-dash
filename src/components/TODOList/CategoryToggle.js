import React from 'react';
import {Option, Select} from "@material-tailwind/react";
import {useSelector} from "react-redux";

// CategoryToggle provides a dropdown menu for selecting a specific category to filter
// TODOItems by category. handleCategoryChange() handles the
// change event of the dropdown and performs the filtering logic.
function CategoryToggle({handleCategoryChange}) {

    const categories = useSelector((state) => state.todoReducer.categories);

    return (
        <Select id="categoryFilter" label="Search by Category" onChange={handleCategoryChange}>
            <Option value="">All Categories</Option>
            {categories.map((category) => (
                <Option key={category} value={category}>
                    {category}
                </Option>
            ))}
        </Select>
    );
}

export default CategoryToggle;