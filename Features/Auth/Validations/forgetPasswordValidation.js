const { check } = require('express-validator');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');
const User = require('../Models/UserModel');

forgetPasswordValidation=[
    check('email').notEmpty().withMessage('البريد الألكتروني مطلوب')
    .isEmail().
    withMessage('البريد الألكتروني غير صحيح'),
    validationMiddleware
];
sendCodeValidation=[
    check('email').notEmpty().withMessage('البريد الألكتروني مطلوب')
    .isEmail().
    withMessage('البريد الألكتروني غير صحيح'),
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

editMyAccountValidation=[
    check('phone').optional().isMobilePhone().withMessage('رقم الهاتف غير صحيح').custom(async (value,req) => {
      
        

        const user=await User.findOne({where:{phone:value}});
        if(user){
           
            return Promise.reject(new Error('رقم الهاتف موجود بالفعل'));
        }
    }),
    check('firstName').optional().isLength({ min: 3 }).withMessage('يجب الا يقل الاسم عن 3 حروف'),
    check('lastName').optional().isLength({ min: 3 }).withMessage('يجب الا يقل الاسم عن 3 حروف'),

    validationMiddleware
    
]
module.exports={
    forgetPasswordValidation,
    sendCodeValidation,
    restPasswordValidation,
    editMyAccountValidation
};