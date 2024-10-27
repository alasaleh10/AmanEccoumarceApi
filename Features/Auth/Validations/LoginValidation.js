const { check } = require('express-validator');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');
loginValidation = [
    check('phone').notEmpty().withMessage('رقم الهاتف مطلوب').isNumeric()
    .withMessage('رقم الهاتف غير صحيح'),
    check('password').notEmpty().withMessage('كلمة المرور مطلوبة')
    .isLength({ min: 8 }).withMessage('يجب الا يقل كلمة المرور عن 8 حروف'),
    validationMiddleware
];



    module.exports=loginValidation