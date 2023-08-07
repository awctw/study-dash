const Module = require('../models/habit.model')
const dayjs = require('dayjs')

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

const toggleHabbitDate = async (req, res) => {
    const habit = await Module.findOne({_id: req.params.habitID}).exec()

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    date = new Date(year, month, day)
    let today = dayjs(date)

    if (habit.dates.length > 0 && today.diff(habit.dates.at(-1))) {
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
    toggleHabbitDate,
    deleteHabit,
}