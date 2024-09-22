const { check } = require('express-validator');
const Category = require('../../Categories/Models/categorieModel');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');

addPrpductValidation = [
    check('name').notEmpty().withMessage('اسم المنتج مطلوب'),
    check('subName').notEmpty().withMessage('اسم فرعي للمنتج مطلوب'),
    check('description').notEmpty().withMessage('وصف المنتج مطلوب'),
    check('price').notEmpty().withMessage('سعر المنتج مطلوب').isNumeric().withMessage('سعر المنتج غير صحيح'),
    // check('image').notEmpty().withMessage('صورة المنتج مطلوب'),
    check('quilty').notEmpty().withMessage('الكمية المتاحة مطلوبة').isNumeric().withMessage('الكمية المتاحة غير صحيحة'),
    check('discount').optional().isNumeric().withMessage('خصم المنتج غير صحيح'),
    check('categoriee').notEmpty().withMessage('القسم مطلوب')
    .isNumeric().withMessage('القسم غير صحيح')
    .custom(async (value) => {
       
        
        const category = await Category.findOne({ where: { id: value } });
        if (!category) {
            return Promise.reject(new Error('القسم غير موجود'));
        }
    }),


    validationMiddleware
];
module.exports = addPrpductValidation
