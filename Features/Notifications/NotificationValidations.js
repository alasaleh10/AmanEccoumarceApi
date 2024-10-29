const { check } = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');
const User = require('../Auth/Models/UserModel');

addNotificationValidation=[
    check('title').notEmpty().withMessage('عنوان الاشعار مطلوب'),
    check('body').optional({nullable:true}).isLength({ min: 5 }).withMessage('يجب الا يقل وصف الاشعار عن 5 حروف'),
    check('user').optional().isNumeric().withMessage('يجب تحديد المستخدم')
    .custom(async (value) => {
        const user=await User.findOne({where:{id:value}});
        if(!user){
            return Promise.reject(new Error('المستخدم غير موجود'));
        }
        return true;
        
    }),

    validationMiddleware

]
module.exports={
    addNotificationValidation

}