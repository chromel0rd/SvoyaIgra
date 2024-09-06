'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 10), 
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sam',
      email: 'sam@sam',
      password: await bcrypt.hash('123', 10),
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      name: 'Eva',
      email: 'eva@eva',
      password: await bcrypt.hash('123', 10),
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};