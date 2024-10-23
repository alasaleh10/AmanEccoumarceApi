const { check,query } = require('express-validator');
const moment = require('moment-timezone');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');
const Coupon = require('./CouponModel');

addCouponValidation = [

    check('code').notEmpty().withMessage('كود الكوبون مطلوب').custom(async (value) => {

        const coupon = await Coupon.findOne({ where: { code: value } });

        if (coupon) {
            return Promise.reject(new Error('كود الكوبون موجود مسبقا'));
        }
    }),

    check('count').notEmpty().withMessage('عدد الكوبون مطلوب')
    .isNumeric().withMessage('العدد غير صحيح')
    .custom((value) => {
        if(value<=0)
            {
                return Promise.reject(new Error('العدد يجب ان يكون اكبر من صفر'));
            }
            return true;
    }),



    check('discount').notEmpty().withMessage('نسبة الخصم مطلوبة')
    .isNumeric().withMessage('النسبة غير صحيحة').custom((value) => {

        if(value<0)
            {
                return Promise.reject(new Error('نسبة الخصم يجب ان تكون اكبر من صفر'));
            }

        if(value>100)
            {
                return Promise.reject(new Error('نسبة الخصم يجب ان تكون اقل من 100'));
            }
            return true;
    }),
    
    check('expire')
    .notEmpty().withMessage('تاريخ الانتهاء مطلوب')
    .custom((value) => {

        if (!moment(value, ['YYYY-MM-DD', 'YYYY-M-D', 'YYYY/MM/DD', 'YYYY/M/D', 'YYYY-MM-DDTHH:mm:ss.SSS'], true).isValid()) {

            return Promise.reject(new Error('تاريخ الانتهاء غير صحيح'));
        }

        const expireDate = moment(value, ['YYYY-MM-DD', 'YYYY-M-D', 'YYYY/MM/DD', 'YYYY/M/D', 'YYYY-MM-DDTHH:mm:ss.SSS'], true); 
        const today = moment.tz('Asia/Aden').startOf('day');

        if (expireDate.isBefore(today)) {

            return Promise.reject(new Error('تاريخ الانتهاء يجب أن يكون بعد أو يساوي تاريخ اليوم'));
        }

        return true;
    }),

    validationMiddleware
]
cheekCouponValidation=
[
    query('code').notEmpty().withMessage('كود الكوبون مطلوب'),
  
    validationMiddleware
]

module.exports={
    addCouponValidation,
    cheekCouponValidation

}