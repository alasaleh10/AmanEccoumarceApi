const { check,param } = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');
const User = require('../../Features/Auth/Models/UserModel');

cheekUserValidation = [

    param('id').notEmpty().withMessage('المستخدم مطلوب').isNumeric().withMessage('المستخدم غير صحيح')
    .custom(async (value) => {
        const user = await User.findOne({ where: { id: value } });
        if (!user) {
            return Promise.reject(new Error('المستخدم غير موجود'));
        }
    }),

    validationMiddleware
];
editCriditAndPoint=[
    check('credit').optional({nullable:true}).isNumeric().withMessage('الرصيد غير صحيح'),
    check('points').optional({nullable:true}).isNumeric().withMessage('النقاط غير صحيح'),

    validationMiddleware
];
module.exports = {
    cheekUserValidation
    ,editCriditAndPoint
}