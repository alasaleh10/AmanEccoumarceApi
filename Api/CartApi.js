const express = require('express');
const router = express.Router();
const {addCartValidation,
    deleteCartValidatio,
    cheekWalletValidation,
    editCartValidation,
    cheekCartProductQuantity

    
} = require('../Features/cart/CartValidation');
const CartController = require('../Features/cart/CartController');
const cartController=new CartController();
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController =new AuthController();

router.post('/addToCart',
    authController.cheekToken,
    addCartValidation,
    cartController.addToCart
)
router.get('/myCart',
    authController.cheekToken,
    cartController.getMyCart
),
router.post('/addOneToCart',
    authController.cheekToken,
    addCartValidation,
    cartController.addOneToCart
),
router.delete('/deleteOneFromCart',
    authController.cheekToken,
    deleteCartValidatio,
    cartController.deleteFromCart
),
router.get('/cartDelivery',
    authController.cheekToken,
    cartController.getCartDelivery
)
router.post('/cheekMyWallet',
    authController.cheekToken,
    cheekWalletValidation,
    cartController.cheekMyWallet
),
router.get('/cheekCartItemsQuantity',
    authController.cheekToken,
    cartController.cheekCartItemsQuantity
)
router.post('/editCart',
    authController.cheekToken,
    editCartValidation,
   cartController.editCart
)

router.get('/cheekCartProduct/:id?',
    authController.cheekToken,
    cheekCartProductQuantity,
    cartController.cheekCartProduct
)
router.delete('/deleteProductFromCart/:id?',
    authController.cheekToken,
    cartController.deleteProductFromCart
)



module.exports=router;