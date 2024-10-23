const express = require('express');
const router = express.Router();
const AuthController = require('../Features/Auth/Controller/AuthController');
authController=new AuthController();
const CouponController = require('../Features/Coupons/CouponController');
couponController=new CouponController();
const {
    cheekCouponValidation
} = require('../Features/Coupons/CouponValidation');



router.get('/cheekCoupon',
    authController.cheekToken,
    cheekCouponValidation,
    couponController.cheekCoupon
)



module.exports=router    

