'use strict';
const moment = require('moment-timezone');
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss');
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
