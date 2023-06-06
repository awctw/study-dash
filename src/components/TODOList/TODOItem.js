import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
} from "@material-tailwind/react";
import EditTODO from "./EditTODO";
import {deleteTODO} from "../../store/TODOList_Slice";

const TODOItem = (props) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTODO(props.todo.id));
    };

    return (
        <div className="todoItem">
            <h3>Title: {props.todo.title}</h3>
            <p>Due Date: {props.todo.dueDate.toDateString()}</p>
            <div id="todoItemButtons">
                <Button color="red" size="sm" onClick={handleDelete}>Delete</Button>
                <EditTODO todo={props.todo} />
            </div>
        </div>
    );
};

export default TODOItem;
