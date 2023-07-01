const Module = require('../models/flashcard.model');

const addModule = async (req, res, next) => {

    const { moduleName, userID } = req.body;

    const module = new Module({
        name: moduleName,
        userID: userID,
        questions: [],
        answers: [],
    });

    try {
        await module.save();
        res.status(200).send(JSON.stringify(module));
    } catch (err) {
        res.status(500).send(err);
    }
};

const getAllModules = async (req, res, next) => {
    await Module.find({userID: req.params.userID})
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
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
            res.status(500).send(err);
        });
}

const editFlashcard = async (req, res, next) => {

    const id = req.params.moduleId, cardIndex = req.query.cardIndex;
    
    const module = await Module.findById(id);

    module.questions[cardIndex] = req.body.question;
    module.answers[cardIndex] = req.body.answer;

    await module.save()
        .then(() => {
            res.status(200).send({
                id: module._id,
                index: cardIndex,
                question: module.questions[cardIndex],
                answer: module.answers[cardIndex],
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

module.exports = {
    addModule,
    getAllModules,
    addFlashcard,
    editFlashcard,
}

/**
 * References:
 * - MongoDB documentation
 * - ChatGPT
 */