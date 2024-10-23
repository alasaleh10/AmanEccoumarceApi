const express = require('express');
const router = express.Router();
const AdminCouponsController = require('../../Admin/Coupons/AdminCouponController');
const adminCouponsController = new AdminCouponsController();
const AuthController = require('../../Features/Auth/Controller/AuthController');
const authController = new AuthController();
const {addCouponValidation} = require('../../Features/Coupons/CouponValidation');


router.post('/add',
    authController.cheekToken,
    authController.cheekisAdmin,
    addCouponValidation,
    adminCouponsController.addCoupon

)
router.get('/',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminCouponsController.getCoupons
)
router.get('/:id?',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminCouponsController.getCouponDetils
)
// router.delete('/:id?',
//     authController.cheekToken,
//     authController.cheekisAdmin,
//     adminCouponsController.deleteCoupon
// )



module.exports = router