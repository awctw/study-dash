import React from 'react';
import TodoItem from './TODOItem';

// The ListView component is responsible for rendering the list of visible TODOitems.
const ListView = ({ visibleTODOs }) => {

    // Since the props visibleTODOs is not mutable, a new array sortedTodos is created using
    // the spread operator [...visibleTODOs]. The sort method is then called on sortedTodos
    // to sort the TODOItems based on their dueDate property in ascending order.
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
