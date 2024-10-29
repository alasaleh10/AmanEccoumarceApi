const { check } = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');

locationValidation = [
    check('type').notEmpty().withMessage('نوع الموقع مطلوب'),
    check('name').notEmpty().withMessage('اسم الموقع مطلوب'),
    check('lat').notEmpty().withMessage('خط العرض مطلوب'),
    check('lng').notEmpty().withMessage('خط الطول مطلوب'),
    check('street').notEmpty().withMessage('الشارع مطلوب'),
    validationMiddleware
];
setMainLocation=[
check('id').notEmpty().withMessage('الموقع مطلوب'),

    validationMiddleware
]


module.exports = {
    locationValidation,
    setMainLocation

};