const { check } = require('express-validator');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');
const User = require('../Models/UserModel');


virifyCodeValidation = [

    check('email').notEmpty().withMessage('البريد الألكتروني مطلوب')
    .isEmail().
    withMessage('البريد الألكتروني غير صحيح').
    custom(async (value) => {
        const user=await User.findOne({where:{email:value}});
        if(!user){
           
            return Promise.reject(new Error('البريد الألكتروني غير موجود'));
        }
        
    }),
    check('virifyCode').notEmpty().withMessage('كود التحقق مطلوب'),

    validationMiddleware
];
module.exports=virifyCodeValidation;