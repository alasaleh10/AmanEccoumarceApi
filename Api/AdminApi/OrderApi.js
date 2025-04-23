const express = require('express');
const router = express.Router();
const AuthController = require('../../Features/Auth/Controller/AuthController');
const authController = new AuthController();
const AdminOrderController = require('../../Admin/Orders/AdminOrdersController');
const adminOrderController = new AdminOrderController();

router.get('/search',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminOrderController.searchOrders


)
router.get('/:order?',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminOrderController.getOrderDetils
)
module.exports=router;