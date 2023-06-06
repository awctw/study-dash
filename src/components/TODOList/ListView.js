import React from 'react';
import TodoItem from './TODOItem';

const ListView = (props) => {

    let sortedTodos = [...props.visibleTODOs];

    // Sort todos by dueDate attribute so that TODOs with the earliest
    // due date will be closer to the top of the list
    sortedTodos.sort((a, b) => a.dueDate - b.dueDate);

    return (
        <div className="list-view">
            {sortedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};

export default ListView;
