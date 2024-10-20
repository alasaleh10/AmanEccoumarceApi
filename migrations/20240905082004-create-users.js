'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING(255),
        allowNull: false 
      },
      lastName: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(800),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING(800),
        allowNull: true
      },
      virifyCode: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      expireCodeDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      points: {
        type: Sequelize.INTEGER,
        default: 0
      },
      credit: {
        type: Sequelize.INTEGER,
        default: 0
      },
      passwordUpdatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
