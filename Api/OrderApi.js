const express = require('express');
const router = express.Router();
const AuthControoler = require('../Features/Auth/Controller/AuthController');
const authController = new AuthControoler();
const OrderController = require('../Features/orders/OrderController');
const orderController = new OrderController();
const {addOrderValidation,
    orderDetilsValidation
                          } = require('../Features/orders/OrderValidation');




router.post('/createOrder',
    authController.cheekToken,
    addOrderValidation,
    orderController.addOrder
),
router.get('/myPreviousOrders',
    authController.cheekToken,
    orderController.getMyPreviousOrders
)
router.get('/myCurrentOrders',
    authController.cheekToken,
    orderController.getCurrentOrder
)
router.get('/orderDetails/:id?',
    authController.cheekToken,
    orderDetilsValidation,
    orderController.getMyOrderDetils
)
router.get('/:id?',
    orderDetilsValidation,
    authController.cheekToken,
    orderController.serchOrder


)






module.exports = router