import React from 'react';
import ListView from './ListView';

const TODOListViewer = (props) => {

    const isVisibleTODOListEmpty = () => {
        return props.todos.length === 0;
    }

    return (
        <div className="TODOListViewer">
            <header id="TODOListViewerHeader">
                <h1 id="TODOListViewerHeaderTitle">TODO List</h1>
                <p>Total Todos: {props.todos.length}</p>
            </header>
            {!isVisibleTODOListEmpty() && <ListView visibleTODOs={props.todos} />}
        </div>
    );
};

export default TODOListViewer;
