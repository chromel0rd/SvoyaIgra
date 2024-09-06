'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GameQuestion extends Model {
    static associate(models) {
      // Ассоциации с таблицами Game и Question
      GameQuestion.belongsTo(models.Game, { foreignKey: 'gameId' });
      GameQuestion.belongsTo(models.Question, { foreignKey: 'questionId' });
    }
  }

  GameQuestion.init({
    gameId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    isAnswered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'GameQuestion',
  });

  return GameQuestion;
};
