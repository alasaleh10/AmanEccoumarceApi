'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await  queryInterface.createTable('coupons', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    discount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    count:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    expire: {
      type: Sequelize.DATE,
      allowNull: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    
  })
  },

  async down (queryInterface, Sequelize) {
   await  queryInterface.dropTable('coupons');
  }
};
