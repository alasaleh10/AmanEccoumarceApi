const express = require('express');
const router = express.Router();
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController = new AuthController();

const ProcuctController = require('../Features/Products/ProductController');
const procuctController = new ProcuctController();

const productDetilsValidation = require('../Features/Products/validations/ProductDetilsValidation');



router.get('/getProductsByCategoriees/:id',
  authController.optinalToken,
  // productCategorieeValidation,
    procuctController.getProductsByCategoriees),
  
router.get('/newAmanProducts',
  authController.optinalToken,
    procuctController.getNewAmanProducts
);
router.get('/getSpicificProduct/:id?',
  productDetilsValidation,
  authController.optinalToken,
    procuctController.getSpicificProduct
);
module.exports = router;