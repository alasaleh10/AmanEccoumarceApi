'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date().toString(); // استخدم JavaScript Date للحصول على التاريخ الحالي
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
        image: 'Perfumes.jpg',
        isActive: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'سوني',
        image: 'playstation.jpg',
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
