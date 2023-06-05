import React, { useState } from 'react';
import TODOListViewer from './TODOListViewer';
import ControlPanel from './ControlPanel';
import {useSelector} from "react-redux";

const TODOListMainView = () => {
    const todoList = useSelector(state => state.todoReducer.TODOList);
    const [selectedCategory, setSelectedCategory] = useState('');

    const getVisibleTODOs = () => {
        if (selectedCategory === '') {
            return todoList;
        }
        return todoList.filter((todo) => todo.category === selectedCategory);
    };

    return (
        <div className="todoListMainView">
            <TODOListViewer todos={getVisibleTODOs()} />
            <ControlPanel
                setSelectedCategory={setSelectedCategory}
            />
        </div>
    );
};

export default TODOListMainView;
