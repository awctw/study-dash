var express = require('express');
var router = express.Router();
const { addModule, getAllModules, addFlashcard, editFlashcard, deleteFlashcard, deleteModule } = require('../controllers/flashcard.controller');

router.post('/', addModule);

router.get('/:userID', getAllModules);

router.patch('/:moduleId', addFlashcard);

router.patch('/edit/:moduleId', editFlashcard);

router.delete('/:moduleId/:index', deleteFlashcard);

router.delete('/:moduleId', deleteModule);

module.exports = router;