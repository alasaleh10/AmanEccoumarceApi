const moment = require('moment-timezone');

// console.log(now.unix()); // طباعة timestamp
// const timestamp = now.unix();
// // const date = new Date(timestamp * 1000); // تحويل الـ timestamp من ثواني إلى ملي ثانية
// const date = new Date();
// const gmtPlus3Date = new Date(date.getTime() + (3 * 60 * 60 * 1000)); // إضافة 3 ساعات
// console.log(gmtPlus3Date.toISOString().replace('Z', '+03:00')); // عرض بتنسيق ISO مع GMT+3
console.log(`updatePassword ${moment().tz('Asia/Riyadh').format()}`);
console.log(`iat ${moment().tz('Asia/Riyadh').unix()}`);
console.log(`iat to data ${moment.unix(1728804726)}`);


  