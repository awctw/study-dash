var express = require('express');
var router = express.Router();
const { addModule, getAllModules, addFlashcard } = require('../controllers/flashcard');

router.post('/', addModule);

router.get('/', getAllModules);

router.patch('/:moduleId', addFlashcard);

module.exports = router;