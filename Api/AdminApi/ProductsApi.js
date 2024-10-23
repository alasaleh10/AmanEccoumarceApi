const express = require('express');
const router = express.Router();
const AdminProductsController = require('../../Admin/Products/AdminProductsController');
const adminProductsController = new AdminProductsController();
const AuthController = require('../../Features/Auth/Controller/AuthController');
const authController = new AuthController();
const {uploadMixOfImages} = require('../../Middleware/UploadImageMiddelware');
const {uploadSingleImageOptinal} = require('../../Middleware/UploadOptinalImageMiddelware');
const addProductValidation = require('../../Features/Products/validations/AddProductValidation');
router.post('/add',
    authController.cheekToken,
    authController.cheekisAdmin,
    uploadMixOfImages([
        { name: 'image', maxCount: 1 },
        { name: 'imag', maxCount: 10 }
      ]),
    addProductValidation,
    adminProductsController.addProduct
  ),

  router.get('/',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminProductsController.getAllProdcuts
  )
router.post('/search',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminProductsController.searchProducts
    )  
router.get('/:id?',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminProductsController.getOneProduct
  )  
  router.put('/edit/:id?',
    authController.cheekToken,
    authController.cheekisAdmin,
    uploadSingleImageOptinal('image'),
    adminProductsController.editProduct
  )
    


module.exports = router