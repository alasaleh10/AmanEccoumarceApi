const { check, body } = require('express-validator');
const validationMiddelware = require('../../../Middleware/validatiorMiddelware');
const ApiError = require('../../../utils/ApiError');

const banarValidation = [
  
    body('image')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new ApiError(400, 'الصورة مطلوبة');
                // throw new Error('الصورة مطلوبة');
            }
            return true;
        }),
    validationMiddelware
];

module.exports = banarValidation;
