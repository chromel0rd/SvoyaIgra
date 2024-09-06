'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      // Ассоциация с GameQuestions (один вопрос может принадлежать многим играм)
      Question.hasMany(models.GameQuestion, { foreignKey: 'questionId' });
    }
  }

  Question.init({
    category: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    question: DataTypes.TEXT,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });

  return Question;
};
