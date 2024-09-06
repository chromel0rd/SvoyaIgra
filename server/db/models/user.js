'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Ассоциация с таблицей Game (User может участвовать в нескольких играх)
      User.hasMany(models.Game, { foreignKey: 'userId' });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    totalScore: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
