const { check } = require('express-validator');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');
const User = require('../Models/UserModel');

forgetPasswordValidation=[
    check('email').notEmpty().withMessage('البريد الألكتروني مطلوب')
    .isEmail().
    withMessage('البريد الألكتروني غير صحيح').
    custom(async (value) => {
        const user=await User.findOne({where:{email:value}});
        if(!user){
           
            return Promise.reject(new Error('البريد الألكتروني غير موجود '));
        }       
    }),
    validationMiddleware
];
sendCodeValidation=[
    check('email').notEmpty().withMessage('البريد الألكتروني مطلوب')
    .isEmail().
    withMessage('البريد الألكتروني غير صحيح').
    custom(async (value) => {
        const user=await User.findOne({where:{email:value}});
        if(!user){
           
            return Promise.reject(new Error('البريد الألكتروني غير موجود '));
        }       
    }),
    validationMiddleware
];
restPasswordValidation=[
    check('email').notEmpty().withMessage('البريد الألكتروني مطلوب')
    .isEmail().
    withMessage('البريد الألكتروني غير صحيح').
    custom(async (value) => {
        const user=await User.findOne({where:{email:value}});
        if(!user){
           
            return Promise.reject(new Error('البريد الألكتروني غير موجود '));
        }
        
    }),

    check('password').notEmpty().withMessage('كلمة المرور مطلوبة')
    .isLength({ min: 8 }).withMessage('يجب الا يقل كلمة المرور عن 8 حروف'),
    check('confirmPassword')
    .notEmpty()
    .withMessage('تأكيد كلمة المرور مطلوبة')
    .custom((value, { req }) => {    
        if (value !== req.body.password) {
            throw new Error('كلمة المرور غير متطابقة');
        }
        return true; 
    }),
    validationMiddleware
];

module.exports={
    forgetPasswordValidation,
    sendCodeValidation,
    restPasswordValidation
};