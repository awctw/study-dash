import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { deleteAllTODOs } from '../../store/todoListSlice';
import AddTODOItem from './AddNewTODO';
import CategoryToggle from "./CategoryToggle";

// ControlPanel component provides functionalities for clearing all TODOItems,
// adding new TODOItems, and filtering TODOs by category.
const ControlPanel = ({setSelectedCategory}) => {
    const dispatch = useDispatch();

    const handleClearTodos = React.useCallback(() => {
        dispatch(deleteAllTODOs());
    }, [dispatch]);

    return (
        <div className="control-panel">
            <Button id="clearAllButton" color="orange" size="sm" onClick={handleClearTodos}>
                Clear all TODOs
            </Button>
            <AddTODOItem />
            <CategoryToggle handleCategoryChange={setSelectedCategory}/>
        </div>
    );
};

export default ControlPanel;
