'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     
    await queryInterface.createTable('problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER 
      },
      type:{
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {

        type: Sequelize.STRING(255),
        allowNull: false
      },
      discription: {
        type: Sequelize.STRING(800)
      },
      isNew: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false

      },
      user:{
        type: Sequelize.INTEGER,
        allowNull:true
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('problems');
  }
};
