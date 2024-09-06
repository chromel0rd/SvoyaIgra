const express = require('express');
const { Gamequestion } = require('../../db/models');

const gameQuestRouter = express.Router();

gameQuestRouter.route('/:id').patch(async (req, res) => {
  try {
    await Gamequestion.update(req.body, { where: { id: req.params.id } });
    const gameQuest = await Gamequestion.findByPk(req.params.id);
    res.json(gameQuest);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
