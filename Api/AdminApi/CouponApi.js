const express = require('express');
const router = express.Router();
const AdminCouponsController = require('../../Admin/Coupons/AdminCouponController');
const adminCouponsController = new AdminCouponsController();
const AuthController = require('../../Features/Auth/Controller/AuthController');
const authController = new AuthController();
const {addCouponValidation,
    editCouponValidation

} = require('../../Features/Coupons/CouponValidation');


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
router.post('/serachCoupons',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminCouponsController.serachCoupons

)

router.put('/:id?',
    authController.cheekToken,
    authController.cheekisAdmin,
    editCouponValidation,
    adminCouponsController.editCoupone

)
// router.delete('/:id?',
//     authController.cheekToken,
//     authController.cheekisAdmin,
//     adminCouponsController.deleteCoupon
// )



module.exports = router