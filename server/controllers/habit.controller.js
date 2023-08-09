const Module = require('../models/habit.model')
const dayjs = require('dayjs')
let utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const getHabits = async (req, res) => {
    const habits = await Module.find({userID: req.params.userID})
    res.send(habits)
}

const addHabit = async (req, res) => {
    const module = new Module({
        userID: req.body.userID,
        name: req.body.name,
        days: req.body.days,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        dates: req.body.dates,
    })

    await module.save()
    res.json(module)
}

const toggleHabitDate = async (req, res) => {
    const habit = await Module.findOne({_id: req.params.habitID}).exec()

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    date = Date.UTC(year, month, day)
    let today = dayjs(date).utc()

    if (habit.dates.length > 0 && today.diff(habit.dates[habit.dates.length - 1])) {
        habit.dates.push(today)
        await habit.save()
    } else if (habit.dates.length === 0) {
        habit.dates.push(today)
        await habit.save()
    } else {
        habit.dates.pop()
        await habit.save()
    }

    const habits = await Module.find({userID: habit.userID})
    res.send(habits)
}

const deleteHabit = async (req, res) => {
    const habit = await Module.findOne({_id: req.params.habitID}).exec()
    await Module.deleteOne({_id: req.params.habitID})
    const habits = await Module.find({userID: habit.userID})
    res.send(habits)
}

module.exports = {
    getHabits,
    addHabit,
    toggleHabitDate,
    deleteHabit,
}