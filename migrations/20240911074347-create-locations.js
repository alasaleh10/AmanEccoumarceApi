'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await  queryInterface.createTable('locations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      name: {
        type: Sequelize.STRING(400),
        allowNull: false
      },
      lat: {
        type: Sequelize.STRING(800),
        allowNull: false
      },
      lng: {
        type: Sequelize.STRING(800),
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(800),
        allowNull: false
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }

      },
      street: {
        type: Sequelize.STRING(600),
        allowNull: false
      },
      home: {
        type: Sequelize.STRING(400),
        allowNull: true

      },
      roomNo:{
        type: Sequelize.STRING(200),
        allowNull: true
      },
      isMain:{
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE,
        
      },
     
      updatedAt: {
        type: Sequelize.DATE,
       
      }
      
    })
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
 
  }
};
