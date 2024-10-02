const { check } = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');
const Product = require('../Products/ProductModel');
const Cart = require('./CartModel');

addCartValidation = [

    check('product').notEmpty().withMessage('المنتج مطلوب').isNumeric().withMessage('المنتج غير صحيح').custom(async (value) => {
        const product = await Product.findOne({ where: { id: value } });
        if (!product) {
            return Promise.reject(new Error('المنتج غير موجود'));
        }
    }),

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
    .isNumeric().withMessage('المنتج غير صحيح')
    .custom(async (value,{req}) => {
        const cart = await Cart.findOne({ where: { user: req.user.id, product: value } });
       
        if (!cart ) {
            return Promise.reject(new Error('المنتج غير موجود'));
        }
      
    }),
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
module.exports = {
    addCartValidation,
    deleteCartValidatio,
    cheekWalletValidation,
    // cheekCartItemsQuantity

}