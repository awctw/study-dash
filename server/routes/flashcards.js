var express = require('express');
var router = express.Router();
const { addModule, getAllModules, addFlashcard, editFlashcard } = require('../controllers/flashcard');

router.post('/', addModule);

router.get('/', getAllModules);

router.patch('/:moduleId', addFlashcard);

router.patch('/edit/:moduleId', editFlashcard);

module.exports = router;