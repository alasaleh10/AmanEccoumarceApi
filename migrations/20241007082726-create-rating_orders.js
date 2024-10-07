'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('rating_orders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false
       },
       feadback: {
          type: Sequelize.INTEGER,
          allowNull: false
       },
       comment: {
          type: Sequelize.STRING(500),
          allowNull: true
       },
    order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
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
   await queryInterface.dropTable('rating_orders');
  }
};
