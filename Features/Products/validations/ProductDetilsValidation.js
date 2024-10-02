const { param } = require('express-validator');
const Product = require('../ProductModel');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');
productDetilsValidation=[

    param('id').notEmpty().withMessage('المنتج مطلوب').isNumeric().withMessage('المنتج غير صحيح')
    .custom(async (value) => {
        const product = await Product.findOne({ where: { id: value ,isActive: true} });
        if (!product) {
            return Promise.reject(new Error('المنتج غير موجود'));
        }
        
    }),

    validationMiddleware
];
module.exports=productDetilsValidation;