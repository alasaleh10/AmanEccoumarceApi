const moment = require('moment-timezone');

const now = moment().tz('Asia/Aden').format('YYYY-MM-DD HH:mm:ss');
module.exports = now;