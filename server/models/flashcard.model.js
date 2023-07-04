const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const flashcardSchema = new Schema({
    question: String,
    answer: String,
    quality: Number,
    reps: Number,
    easeFactor: Number,
    interval: Number,
    reviewDate: Date,
});

const flashcardModuleSchema = new Schema({
    name: String,
    userID: String,
    flashcards: [flashcardSchema],
});

const Module = model('Flashcard', flashcardModuleSchema);

module.exports = Module;

/**
 * References:
 * - MongoDB documentation
 * - ChatGPT
 */