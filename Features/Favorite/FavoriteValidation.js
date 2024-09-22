const { check } = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');
const Product = require('../Products/ProductModel');
const Favorite = require('../Favorite/FavoriteModel');

addFavoriteValidation = [   
    check('product').notEmpty().withMessage('المنتج مطلوب').isNumeric().withMessage('المنتج غير صحيح')
    .custom(async (value) => {
        const product = await Product.findOne({ where: { id: value } });
        if (!product) {
            return Promise.reject(new Error('المنتج غير موجود'));
        }
        
    }),
    
    validationMiddleware
 ];
 deleteFavoriteValidation = [   
    check('product').notEmpty().withMessage('المنتج مطلوب').isNumeric().withMessage('المنتج غير صحيح')
    .custom(async (value) => {
        const favorite = await Favorite.findOne({ where: { product: value } });
        if (!favorite) {
            return Promise.reject(new Error('المنتج غير موجود'));
        }
      
        
    }),
    
    validationMiddleware
 ];
module.exports = {addFavoriteValidation,deleteFavoriteValidation}