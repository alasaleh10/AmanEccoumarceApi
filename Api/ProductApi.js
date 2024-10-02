const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController = new AuthController();
const addProductValidation = require('../Features/Products/validations/AddProductValidation');
const ProcuctController = require('../Features/Products/ProductController');
const procuctController = new ProcuctController();
const {uploadMixOfImages} = require('../Middleware/UploadImageMiddelware');
const productDetilsValidation = require('../Features/Products/validations/ProductDetilsValidation');
router.post('/addProduct',
 
  
    authController.cheekToken,
    authController.cheekisAdmin,
    uploadMixOfImages([
        { name: 'image', maxCount: 1 },
        { name: 'imag', maxCount: 10 }
      ]),
    addProductValidation,
    procuctController.addProduct
  ),


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