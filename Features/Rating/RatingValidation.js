const { check } = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');
const Order = require('../orders/OrderModel');

addRatingValidation = [
    check('rating').notEmpty().withMessage('التقييم مطلوب')
    .isNumeric().withMessage('التقييم غير صحيح'),
    check('feadback').notEmpty().withMessage('التقييم مطلوب')
    .isNumeric().withMessage('التقييم غير صحيح'),
    check('comment').optional({nullable:true})
    .isLength({ min: 3 }).withMessage('يجب الا يقل وصف التقييم عن 3 حروف'),
    check('order').notEmpty().withMessage('الطلب مطلوب')
    .isNumeric().withMessage('الطلب غير صحيح').custom(async (value, { req }) => {

        const order = await Order.findOne({ where: { id: value ,user:req.user.id} });
        if (!order) {
            return Promise.reject(new Error('الطلب غير موجود'));
        }
    }),
   


    validationMiddleware

];

module.exports = { addRatingValidation }