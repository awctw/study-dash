import React from 'react';
import TodoItem from './TODOItem';

const ListView = ({ visibleTODOs }) => {
    let sortedTodos = [...visibleTODOs].sort((a, b) => a.dueDate - b.dueDate);

    return (
        <div className="list-view">
            {sortedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};

export default ListView;
