var express = require('express');
var router = express.Router();
const { addModule, getAllModules, addFlashcard, editFlashcard } = require('../controllers/flashcard.controller');

router.post('/', addModule);

router.get('/:userID', getAllModules);

router.patch('/:moduleId', addFlashcard);

router.patch('/edit/:moduleId', editFlashcard);

module.exports = router;