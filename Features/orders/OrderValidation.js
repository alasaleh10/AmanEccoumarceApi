const { check ,body} = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');
const Coupone = require('../Coupons/CouponModel');
const Location = require('../locations/LocationModel');
const Order = require('./OrderModel');
addOrderValidation=[

    check('coupon').optional({nullable:true})
    .isNumeric().withMessage('يجب تحديد الكوبون')
    .custom(async (value) => {

        const coupon = await Coupone.findOne({ where: { id: value } });
        if (!coupon) {
            return Promise.reject(new Error('الكوبون غير موجود')); }}),
    check('deliveryPrice').optional({nullable:true}).isNumeric().withMessage('سعر التوصيل غير صحيح'),
    check('totalCart').notEmpty().withMessage('المجموع الكلي مطلوب')
    .isNumeric().withMessage('المجموع الكلي غير صحيح'), 
    check('totalOrder').notEmpty().withMessage('المجموع الكلي للطلب مطلوب')
    .isNumeric().withMessage('المجموع الكلي للطلب غير صحيح'), 
    check('location').optional({nullable:true}).isNumeric().withMessage('يجب تحديد الموقع').custom(async (value) => {

        const location = await Location.findOne({ where: { id: value } });
        if (!location) {
            return Promise.reject(new Error('الموقع غير موجود'));
        }
    }),  
     check('paymentType').notEmpty().withMessage('يجب تحديد نوع الدفع')
     .isNumeric().withMessage('يجب تحديد نوع الدفع'),
     body('items').isArray({ min: 1 }).withMessage('الرجاء تحديد عناصر الطلب'),
     body('items.*.id').isInt({ min: 1 }).withMessage('يجب أن يحتوي كل عنصر على معرف صحيح'),
     body('items.*.quantity').isInt({ min: 1 }).withMessage('يجب أن تحتوي كل عنصر على كمية صحيحة'),
     body('items.*.price').isInt({ min: 1 }).withMessage('يجب أن يحتوي كل عنصر على سعر صحيح'),
   
   


    validationMiddleware
];

orderDetilsValidation=[
    check('id').notEmpty().withMessage('يجب تحديد الطلب').
    isInt({ min: 1 }).withMessage('يجب أن يحتوي الطلب على معرف صحيح')
    .custom(async (value) => {

        const order = await Order.findOne({ where: { id: value } });
        if (!order) {
            return Promise.reject(new Error('الطلب غير موجود'));
        }
    }),
    validationMiddleware

]
module.exports={
    addOrderValidation,
    orderDetilsValidation
}