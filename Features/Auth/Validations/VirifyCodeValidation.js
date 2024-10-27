const { check } = require('express-validator');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');
const User = require('../Models/UserModel');


virifyCodeValidation = [

    check('email').notEmpty().withMessage('البريد الألكتروني مطلوب')
    .isEmail().
    withMessage('البريد الألكتروني غير صحيح'),
    check('virifyCode').notEmpty().withMessage('كود التحقق مطلوب'),

    validationMiddleware
];
module.exports=virifyCodeValidation;