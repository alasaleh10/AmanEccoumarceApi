'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('orders', {
     id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     user: {
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {
         model: 'users',
         key: 'id'
       }
     },
     coupon: {
      type: Sequelize.INTEGER,
      allowNull: true,
     
    },
    isDelivery:{
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    deliveryPrice:{
      type: Sequelize.INTEGER,
      allowNull: true
    },
    isFastDelivery:{
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
     status: {
       type: Sequelize.INTEGER,
       allowNull: false,
       defaultValue:0
       },
    
     totalCart: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    totalOrder:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    deliveryDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    preparingDate: {
      type: Sequelize.DATE,
      allowNull: true
      
    },
    location:{
      type: Sequelize.INTEGER,
      allowNull: true
    },
    paymentType:{
      type: Sequelize.INTEGER,
      allowNull: false
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
   await queryInterface.dropTable('orders');
  }
};
