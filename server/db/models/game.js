'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      // Ассоциация с User (Game принадлежит одному пользователю)
      Game.belongsTo(models.User, { foreignKey: 'userId' });
      // Ассоциация с GameQuestions (одна игра может иметь множество вопросов)
      Game.hasMany(models.GameQuestion, { foreignKey: 'gameId' });
    }
  }

  Game.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });

  return Game;
};
