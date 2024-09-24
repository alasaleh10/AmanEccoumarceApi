const { check } = require('express-validator');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');
const User = require('../Models/UserModel');

signUpValidation = [


    check('firstName').notEmpty().withMessage('الإسم الأول مطلوب')
    .isLength({ min: 3 }).withMessage('يجب الا يقل الإسم الأول عن 3 حروف'),

    check('lastName').
    isLength({ min: 3 }).withMessage('يجب الا يقل الإسم الأخير عن 3 حروف'),

    check('email').notEmpty().withMessage('البريد الألكتروني مطلوب')
    .isEmail().
    withMessage('البريد الألكتروني غير صحيح').
    custom(async (value) => {
        const user=await User.findOne({where:{email:value}});
        if(user){
           
            return Promise.reject(new Error('البريد الألكتروني مستخدم مسبقا'));
        }
        
    }),

    check('phone').notEmpty().withMessage('رقم الهاتف مطلوب').
    isMobilePhone().withMessage('رقم الهاتف غير صحيح').
    isLength({ min: 9 }).withMessage('يجب الا يقل رقم الهاتف عن 9 رقم').
    custom(async (value) => {
        const user=await User.findOne({where:{phone:value}});
        if(user){
           
            return Promise.reject(new Error('رقم الهاتف مستخدم مسبقا'));
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

module.exports=signUpValidation;