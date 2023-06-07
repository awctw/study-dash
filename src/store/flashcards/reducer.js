import { createSlice } from "@reduxjs/toolkit"

const INIT_STATE = {
    modules: [
        {
            id: '1',
            name: 'CPSC 304',
            questions: ["What is an entity set?", "what is a primary key?"],
            answers: ["a logical container for instances of an entity type and instances of any type derived from that entity type", "An attribute in that can uniquely identify each row in a relation"] 
        },
        {
            id: '2',
            name: 'CPSC 330',
            questions: ["What are classification problems?", "what is supervised ML?"],
            answers: ["classification refers to a predictive modeling problem where a class label is predicted for a given example of input data", "Supervised learning is a machine learning paradigm for problems where the available data consists of labeled examples"] 
        },
        {
            id: '3',
            name: 'CPEN 321',
            questions: ["What is MVC pattern?", "What is separation of concerns?"],
            answers: ["Model–view–controller is a software design pattern commonly used for developing user interfaces that divides the related program logic into three interconnected elements", "In computer science, separation of concerns is a design principle for separating a computer program into distinct sections"]
        }
    ]
}

const flashcardSlice = createSlice({
    name: 'flashcards',
    initialState: INIT_STATE,
    reducers: {
        addModule: (state, action) => {
            const {moduleId, moduleName} = action.payload

            state.modules.push({
                id: moduleId,
                name: moduleName,
                questions: [],
                answers: [],
            })
        },
        addFlashcard: (state, action) => {
            const {moduleId, question, answer} = action.payload;

            const module = state.modules.find(module => module.id === moduleId); // return undefined if not found

            if (module) {
                module.questions.push(question);
                module.answers.push(answer);
            }
        }
    },
})

export const {addModule, addFlashcard} = flashcardSlice.actions;

export default flashcardSlice.reducer;