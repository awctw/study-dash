import { createSlice, nanoid } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  categories: [
    "Biology",
    "Chemistry",
    "Computer Science",
    "Language Arts",
    "Math",
    "Musical Art",
    "Physics",
    "Sports",
    "Visual Arts",
    "Work",
  ],
  TODOList: [
    {
      id: "1",
      title: "Complete math hwk",
      dueDate: new Date("June 5, 2023"),
      description: "This is a sample todo.",
      category: "Math",
    },
    {
      id: "2",
      title: "Complete physics hwk",
      dueDate: new Date("June 2, 2023"),
      description: "This is a sample todo.",
      category: "Physics",
    },
    {
      id: "3",
      title: "Complete English literature hwk",
      dueDate: new Date("June 24, 2023"),
      description: "This is a sample todo.",
      category: "Language Arts",
    },
    {
      id: "4",
      title: "Complete math midterm",
      dueDate: new Date("July 14, 2023"),
      description: "This is a sample todo.",
      category: "Math",
    },
    {
      id: "5",
      title: "Complete math Final",
      dueDate: new Date("Aug 5, 2023"),
      description: "This is a sample todo.",
      category: "Math",
    },
    {
      id: "6",
      title: "Complete Physics Final",
      dueDate: new Date("July 10, 2023"),
      description: "This is a sample todo.",
      category: "Physics",
    },
    {
      id: "7",
      title: "Complete Physics Final",
      dueDate: new Date("Aug 12, 2023"),
      description: "This is a sample todo.",
      category: "Physics",
    },
    // Add more sample todos here
  ],
};

const TODOListSlice = createSlice({
  name: "todoList",
  initialState: INITIAL_STATE,
  reducers: {
    addTODO: {
      reducer: (state, action) => {
        state.TODOList.push(action.payload);
      },
      // The addTODO uses the prepare function to generate and initialize the payload with
      // the necessary fields PRIOR to applying the reducer to it.
      prepare: (todo) => {
        return {
          payload: {
            id: nanoid(),
            ...todo,
          },
        };
      },
    },
    editTODO: (state, action) => {
      const { id, title, dueDate, description, category } = action.payload;
      const todoIndex = state.TODOList.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.TODOList[todoIndex] = {
          id,
          title,
          dueDate,
          description,
          category,
        };
      }
    },

    // deleteTODO finds the index of the item based on its ID
    // and deletes it using the splice method.
    deleteTODO: (state, action) => {
      const todoIndex = state.TODOList.findIndex(
        (todo) => todo.id === action.payload
      );
      if (todoIndex !== -1) {
        state.TODOList.splice(todoIndex, 1);
      }
    },
    deleteAllTODOs: (state) => {
      state.TODOList = [];
    },
    addCategory: (state, action) => {
      const categoryIndex = state.categories.findIndex(
        (item) => item === action.payload
      );

      // Only add payload to state.categories only if category does not already
      // exist in the array
      if (categoryIndex === -1) {
        state.categories.push(action.payload);
        state.categories.sort();
      }
    },
  },
});

export const { addTODO, editTODO, deleteTODO, deleteAllTODOs, addCategory } =
  TODOListSlice.actions;

export default TODOListSlice.reducer;
