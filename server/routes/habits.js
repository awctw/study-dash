const express = require('express')
const router = express.Router()

const { getHabits, addHabit } = require('../controllers/habit.controller')

router.route('/').post(addHabit)
router.route('/:userID').get(getHabits)

module.exports = router