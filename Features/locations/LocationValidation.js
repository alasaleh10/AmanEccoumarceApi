const { check } = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');
const Location = require('./LocationModel');

locationValidation = [
    check('type').notEmpty().withMessage('نوع الموقع مطلوب'),
    check('name').notEmpty().withMessage('اسم الموقع مطلوب'),
    check('lat').notEmpty().withMessage('خط العرض مطلوب'),
    check('lng').notEmpty().withMessage('خط الطول مطلوب'),
    check('street').notEmpty().withMessage('الشارع مطلوب'),
    validationMiddleware
];
setMainLocation=[
check('id').notEmpty().withMessage('الموقع مطلوب').custom(async (value, { req }) => {
    const location = await Location.findOne({ where: { id: value,user:req.user.id } });
    if (!location) {
        return Promise.reject(new Error('الموقع غير موجود'));
    }
}),

    validationMiddleware
]


module.exports = {
    locationValidation,
    setMainLocation

};