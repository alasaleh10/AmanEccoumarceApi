const { check } = require('express-validator');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');
const User = require('../Models/UserModel');
loginValidation = [
    check('phone').notEmpty().withMessage('رقم الهاتف مطلوب').isNumeric()
    .withMessage('رقم الهاتف غير صحيح').custom(async (value) => {
        const user = await User.findOne({ where: { phone: value } });
        if (!user) {
            return Promise.reject(new Error('الحساب غير موجود'));
        }
    }),
    check('password').notEmpty().withMessage('كلمة المرور مطلوبة')
    .isLength({ min: 8 }).withMessage('يجب الا يقل كلمة المرور عن 8 حروف'),
    validationMiddleware
];



    module.exports=loginValidation