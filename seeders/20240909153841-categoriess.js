'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date(); 
    
    await queryInterface.bulkInsert('categories', [
      {
        name: 'أجهزة الكترونية',
        image: 'electronic.jpg',
        isActive: 1,
        createdAt: now, 
        updatedAt: now 
      },
      {
        name: 'عطورات',
        image: 'Perfumes.png',
        isActive: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'سوني',
        image: 'playstation.png',
        isActive: 1,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
