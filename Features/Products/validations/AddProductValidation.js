const { check } = require('express-validator');
const Categoriee = require('../../Categories/Models/categorieModel');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');

addPrpductValidation = [
    check('name').notEmpty().withMessage('اسم المنتج مطلوب'),
    check('subName').notEmpty().withMessage('اسم فرعي للمنتج مطلوب'),
    check('description').notEmpty().withMessage('وصف المنتج مطلوب'),
    check('price').notEmpty().withMessage('سعر المنتج مطلوب').isNumeric().withMessage('سعر المنتج غير صحيح'),
    check('quilty').notEmpty().withMessage('الكمية المتاحة مطلوبة').isNumeric().withMessage('الكمية المتاحة غير صحيحة'),
    check('discount').optional({nullable:true}).isNumeric().withMessage('خصم المنتج غير صحيح').custom((value) => {
        if(value<0)
        {
            return Promise.reject(new Error('خصم المنتج يجب ان يكون اكبر من صفر'));
        }
if(value>100)
    {
        return Promise.reject(new Error('خصم المنتج يجب ان يكون اقل من 100'));
    }

        return true;
    }),
    check('categoriee').notEmpty().withMessage('القسم مطلوب')
    .isNumeric().withMessage('القسم غير صحيح')
    .custom(async (value) => {
        
        const category = await Categoriee.findOne({ where: { id: value } });
        if (!category) {
            return Promise.reject(new Error('القسم غير موجود'));
        }
    }),


    validationMiddleware
];
module.exports = addPrpductValidation
