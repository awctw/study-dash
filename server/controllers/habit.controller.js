const Module = require('../models/habit.model')

const getHabits = async (req, res) => {
    const habits = await Module.find({})
    console.log(habits)
    res.send(habits)
}

const addHabit = async (req, res) => {
    const module = new Module({
        name: req.body.name
    })

    await module.save()
    res.json(module)
}

module.exports = {
    getHabits,
    addHabit,
}