const { check } = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');

addCartValidation = [

    check('product').notEmpty().withMessage('المنتج مطلوب')
    .isNumeric().withMessage('المنتج غير صحيح'),

    check('quantity').optional().isNumeric().withMessage('الكمية غير صحيحة').custom(async (value) => {
        if(value<1)
            {
                return Promise.reject(new Error('الكمية غير صحيحة'));
            }
        
    }),
  

    validationMiddleware
];

deleteCartValidatio=[
    check('product')
    .notEmpty().withMessage('المنتج مطلوب')
    .isNumeric().withMessage('المنتج غير صحيح'),
    validationMiddleware

];

cheekWalletValidation=[
    check('total').notEmpty().withMessage('المبلغ مطلوب').isNumeric()
    .withMessage('المبلغ غير صحيح'),
    validationMiddleware
];

cheekCartItemsQuantity=[
    check('items')
    .isArray().withMessage('يجب أن تكون جميع عناصر القائمة عناصر صحيحة') 
    .custom((arr) => arr.every(Number.isInteger)) 
    .withMessage('يجب ان تكون أرقام صحيحة'),

    validationMiddleware
]

editCartValidation=[
    check('quantity').notEmpty().withMessage('الكمية مطلوبة')
    .isNumeric().withMessage('الكمية غير صحيحة'),

    check('product').notEmpty().withMessage('المنتج مطلوب')
    .isNumeric().withMessage('المنتج غير صحيح'),
    validationMiddleware
]

cheekCartProductQuantity=[
    check('id').notEmpty().withMessage('المنتج مطلوب')
    .isNumeric().withMessage('المنتج غير صحيح'),


    validationMiddleware

]
module.exports = {
    addCartValidation,
    deleteCartValidatio,
    cheekWalletValidation,
    editCartValidation,
    cheekCartProductQuantity

}