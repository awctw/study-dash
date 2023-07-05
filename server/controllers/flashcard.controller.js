const Module = require('../models/flashcard.model');
const { spacedRep } = require('../utils/spacedRepetition');

const addModule = async (req, res, next) => {

    const { moduleName, userID } = req.body;

    if (!userID || !moduleName) {
        res.status(400).send("Bad request: No userId provided");
        return;
    }

    const module = new Module({
        name: moduleName,
        userID: userID,
        flashcards: [],
    });

    try {
        await module.save();
        res.status(201).send(JSON.stringify(module));
    } catch (err) {
        res.status(500).send(err);
    }
};

const getAllModules = async (req, res, next) => {

    if (!req.params.userID) {
        res.status(400).send("Bad request: No userId provided");
        return;
    }

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

    const flashcard = {
        question: req.body.question,
        answer: req.body.answer,
        quality: 0,
        reps: 0,
        easeFactor: 2.5,
        interval: 0,
        reviewDate: new Date(),
    }

    module.flashcards.push(flashcard);

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

    module.flashcards[cardIndex].question = req.body.question;
    module.flashcards[cardIndex].answer = req.body.answer;

    await module.save()
        .then(() => {
            res.status(200).send({
                id: module._id,
                index: cardIndex,
                question: module.flashcards[cardIndex].question,
                answer: module.flashcards[cardIndex].answer,
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

const deleteFlashcard = async (req, res, next) => {
    const { moduleId, index } = req.params;

    const module = await Module.findById(moduleId);

    module.flashcards.splice(index, 1);

    await module.save()
        .then(() => {
            res.status(204).send({});
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const deleteModule = async (req, res, next) => {
    await Module.deleteOne({_id: req.params.moduleId})
        .then(() => {
            res.status(204).send({});
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const refreshFlashcard = async (req, res, next) => {
    const id = req.params.moduleId, cardIndex = req.query.cardIndex, quality = req.body.quality;

    if (quality > 5 || quality < 0) {
        res.status(400).send("Bad request: quality must be within 0-5");
        return;
    }

    const module = await Module.findById(id);

    const flashcard = module.flashcards[cardIndex];

    // run the algo passing in prev values of attributes
    const { reps, easeFactor, interval, reviewDate } = spacedRep(
        quality,
        flashcard.reps,
        flashcard.interval,
        flashcard.easeFactor
    );

    // update the card attributes with newly generated values
    flashcard.reps = reps;
    flashcard.easeFactor = easeFactor;
    flashcard.interval = interval;
    flashcard.reviewDate = reviewDate;

    await module.save()
        .then(() => {
            res.status(200).send(module.flashcards[cardIndex]);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

module.exports = {
    addModule,
    getAllModules,
    addFlashcard,
    editFlashcard,
    deleteFlashcard,
    deleteModule,
    refreshFlashcard,
}

/**
 * References:
 * - MongoDB documentation
 * - ChatGPT
 */