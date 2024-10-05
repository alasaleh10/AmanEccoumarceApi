const express = require('express');
const router = express.Router();
const AuthControoler = require('../Features/Auth/Controller/AuthController');
const authController = new AuthControoler();
const OrderController = require('../Features/orders/OrderController');
const orderController = new OrderController();
const {addOrderValidation} = require('../Features/orders/OrderValidation');




router.post('/createOrder',
    authController.cheekToken,
    addOrderValidation,
    orderController.addOrder
)




module.exports = router