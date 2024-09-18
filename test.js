const moment = require('moment-timezone');
const now = moment().tz('Asia/Aden');
const date = Math.floor(now.valueOf() / 1000);
console.log(date);

const date1 = new Date(date * 1000);
console.log(date1.toUTCString());



