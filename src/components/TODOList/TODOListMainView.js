import React, { useState } from 'react';
import TODOListViewer from './TODOListViewer';
import ControlPanel from './ControlPanel';
import {useSelector} from "react-redux";

const TODOListMainView = () => {
    // The destructuring assignment is used to directly extract the
    // TODOList state from the todoReducer slice
    const { TODOList } = useSelector((state) => state.todoReducer);
    const [selectedCategory, setSelectedCategory] = useState('');

    const getVisibleTODOs = () => {
        if (!selectedCategory) {
            return TODOList;
        }
        return TODOList.filter((todo) => todo.category === selectedCategory);
    };

    return (
        <div className="todoListMainView">
            <TODOListViewer todos={getVisibleTODOs()} />
            <ControlPanel setSelectedCategory={setSelectedCategory} />
        </div>
    );
};

export default TODOListMainView;

