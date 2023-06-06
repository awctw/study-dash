import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    categories: [
        'math',
        'computer-science',
        'biology',
        'chemistry',
        'physics',
        'language-arts',
        'visual-arts',
        'sports',
        'musical-art',
        'work',
    ],
    TODOList: [
        {
            id: "1",
            title: 'Complete math hwk',
            dueDate: new Date('June 5, 2023'),
            description: 'This is a sample todo.',
            category: 'math',
        },
        {
            id: "2",
            title: 'Complete physics hwk',
            dueDate: new Date('June 2, 2023'),
            description: 'This is a sample todo.',
            category: 'physics',
        },
        {
            id: "3",
            title: 'Complete English literature hwk',
            dueDate: new Date('June 24, 2023'),
            description: 'This is a sample todo.',
            category: 'languageArts',
        },
        {
            id: "4",
            title: 'Complete math midterm',
            dueDate: new Date('July 14, 2023'),
            description: 'This is a sample todo.',
            category: 'math',
        },
        {
            id: "5",
            title: 'Complete math Final',
            dueDate: new Date('Aug 5, 2023'),
            description: 'This is a sample todo.',
            category: 'math',
        },
        {
            id: "6",
            title: 'Complete Physics Final',
            dueDate: new Date('July 10, 2023'),
            description: 'This is a sample todo.',
            category: 'physics',
        },
        {
            id: "7",
            title: 'Complete Physics Final',
            dueDate: new Date('Aug 12, 2023'),
            description: 'This is a sample todo.',
            category: 'physics',
        },
        // Add more sample todos here
    ]
};

const TODOListSlice = createSlice({
    name: 'todoList',
    initialState: INITIAL_STATE,
    reducers: {
        addTODO: (state, action) => {
            state.TODOList.push(action.payload);
        },
        editTODO: (state, action) => {
            state.TODOList = state.TODOList.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
        },
        deleteTODO: (state, action) => {
            state.TODOList = state.TODOList.filter((todo) => todo.id !== action.payload);
        },
        deleteAllTODOs: (state, action) => {
            state.TODOList = [];
        },
    },
});

export const {
    addTODO,
    editTODO,
    deleteTODO,
    deleteAllTODOs, } = TODOListSlice.actions;

export default TODOListSlice.reducer;

