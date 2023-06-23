const express = require('express')
const router = express.Router()

const { getHabits, addHabit } = require('../controllers/habit.controller')

router.route('/').get(getHabits).post(addHabit)

module.exports = router