const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const flashcardModuleSchema = new Schema({
    name: String,
    userID: String,
    questions: [String],
    answers: [String],
});

const Module = model('Flashcard', flashcardModuleSchema);

module.exports = Module;

/**
 * References:
 * - MongoDB documentation
 * - ChatGPT
 */