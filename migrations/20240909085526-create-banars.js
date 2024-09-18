'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('banars', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: Sequelize.STRING(600),
      allowNull: false,
    }
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('banars');
  }
};
