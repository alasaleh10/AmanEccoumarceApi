const { check } = require('express-validator');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');
addProblemValidation = [
    check('type').notEmpty().withMessage('نوع المشكلة مطلوب'),
    check('title').notEmpty().withMessage('عنوان المشكلة مطلوب'),
    check('discription').optional().isLength({ min: 5 }).withMessage('يجب الا يقل وصف المشكلة عن 5 حروف'),
    check('user').optional({nullable:true}).isNumeric().withMessage('يجب تحديد المستخدم'),


    validationMiddleware
    
]

module.exports = {addProblemValidation}