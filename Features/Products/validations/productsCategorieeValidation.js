const { check } = require('express-validator');
const Category = require('../../Categories/Models/categorieModel');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');


productsCategorieeValidation = [

    check('categoriee').notEmpty().withMessage('القسم مطلوب')
    .isNumeric().withMessage('القسم غير صحيح')
    .custom(async (value) => {

        const category = await Category.findOne({ where: { id: value } });
        if (!category) {
            return Promise.reject(new Error('القسم غير موجود'));
        }
    })
    ,

    validationMiddleware

];
module.exports = productsCategorieeValidation;