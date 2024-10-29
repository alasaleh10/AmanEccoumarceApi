'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('notifications', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    body: {
      type: Sequelize.STRING(600),
      allowNull: true
    },
    user:{
      type: Sequelize.INTEGER,
      allowNull: true
    },
    image:{
      type: Sequelize.STRING(800),
      allowNull: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE, 
      allowNull: false
    }
   })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('notifications');
  }
};
