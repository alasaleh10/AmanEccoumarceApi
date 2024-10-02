const express = require('express');
const router = express.Router();
const AuthController = require('../Features/Auth/Controller/AuthController');
authController=new AuthController();
const CouponController = require('../Features/Coupons/CouponController');
couponController=new CouponController();
const {addCouponValidation,
    cheekCouponValidation
} = require('../Features/Coupons/CouponValidation');

router.post('/addCoupon',
    authController.cheekToken,
    authController.cheekisAdmin,
    addCouponValidation,
    couponController.addCoupon
)

router.get('/cheekCoupon',
    authController.cheekToken,
    cheekCouponValidation,
    couponController.cheekCoupon
)



module.exports=router    

