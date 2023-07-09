const Module = require('../models/habit.model')

const getHabits = async (req, res) => {
    const habits = await Module.find({userID: req.params.userID})
    res.send(habits)
}

const addHabit = async (req, res) => {
    const module = new Module({
        userID: req.body.userID,
        name: req.body.name
    })

    console.log(module)
    await module.save()
    res.json(module)
}

module.exports = {
    getHabits,
    addHabit,
}