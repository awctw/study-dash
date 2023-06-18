const Module = require('../models/flashcard');

const addModule = async (req, res, next) => {
    const module = new Module({
        name: req.body.moduleName,
        questions: [],
        answers: [],
    });

    try {
        await module.save();
        res.status(200).send(JSON.stringify(module));
    } catch (err) {
        res.status(400).send(err);
    }
};

const getAllModules = async (req, res, next) => {
    await Module.find({})
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const addFlashcard = async (req, res, next) => {
    const id = req.params.moduleId;

    const module = await Module.findById(id);

    module.questions.push(req.body.question);
    module.answers.push(req.body.answer);

    await module.save()
        .then(() => {
            res.status(200).send(module);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}

module.exports = {
    addModule,
    getAllModules,
    addFlashcard,
}

/**
 * References:
 * - MongoDB documentation
 * - ChatGPT
 */