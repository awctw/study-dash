const Module = require('../models/flashcard.model');
const { spacedRep } = require('../utils/spacedRepetition');

const addModule = async (req, res) => {

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

const getAllModules = async (req, res) => {

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

const addFlashcard = async (req, res) => {
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

const editFlashcard = async (req, res) => {

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

const deleteFlashcard = async (req, res) => {
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

const deleteModule = async (req, res) => {
    await Module.deleteOne({_id: req.params.moduleId})
        .then(() => {
            res.status(204).send({});
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

const refreshFlashcard = async (req, res) => {
    const cardId = req.params.cardId, quality = req.body.quality;

    if (quality > 5 || quality < 0) {
        res.status(400).send("Bad request: quality must be within 0-5");
        return;
    }

    let now = new Date();

    await Module.findOne({
        'flashcards._id': cardId
    })
        .then((module) => {
            const card = module.flashcards.id(cardId);

            /**
             * No need to run the algo if the review is early. This is necessary to avoid
             * the continuous increase of review date if a user excessively reviews during short intervals
             */ 
            if (card.reviewDate > now) {
                return res.status(200).send("Early review: no action needed");
            }

            // run the algo passing in prev values of attributes
            const { reps, easeFactor, interval, reviewDate } = spacedRep(
                quality,
                card.reps,
                card.interval,
                card.easeFactor
            );

            // update the card attributes with newly generated values
            card.reps = reps;
            card.easeFactor = easeFactor;
            card.interval = interval;
            card.reviewDate = reviewDate;

            module.save();

            return res.status(200).send(card);
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
}

const getScheduledCards = async (req, res) => {

    if (!req.params.userID) {
        res.status(400).send("Bad request: No userId provided");
        return;
    }

    let now = new Date();

    await Module.find(
        { userID: req.params.userID }
    )
        .then((modules) => {
            let cards = []
            modules.forEach((module) => {
                const toReview = module.flashcards.filter((card) => {
                    return card.reviewDate <= now
                })

                cards = cards.concat(toReview);
            })
            res.status(200).send(cards);
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
    getScheduledCards,
}

/**
 * References:
 * - MongoDB documentation
 * - ChatGPT
 */