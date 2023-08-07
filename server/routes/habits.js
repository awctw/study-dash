const express = require('express')
const router = express.Router()

const { getHabits, addHabit, toggleHabitDate, deleteHabit } = require('../controllers/habit.controller')

router.route('/').post(addHabit)
router.route('/:userID').get(getHabits)
router.route('/:habitID').patch(toggleHabitDate).delete(deleteHabit)

module.exports = router