const express = require('express');
const { Question } = require('../../db/models');

const questionRouter = express.Router();

questionRouter.route('/')
.get(async (req, res) => {
    try {
        const quests = await Question.findAll();
        res.json(quests);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})


module.exports = questionRouter;