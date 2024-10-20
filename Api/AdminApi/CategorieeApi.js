const express = require('express');
const router = express.Router();
const AuthController = require('../../Features/Auth/Controller/AuthController');
const authController = new AuthController();
const AdminCategorieeController = require('../../Admin/Categoriess/AdminCategorieesController');
const adminCategorieeController = new AdminCategorieeController();
const addCateValidation = require('../../Features/Categories/Validations/AddCategrorieeValidation');
const {uploadSingleImage} = require('../../Middleware/UploadImageMiddelware');
const {uploadSingleImageOptinal} = require('../../Middleware/UploadOptinalImageMiddelware');
router.get('/',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminCategorieeController.getAllCategories
),

router.get('/serarchCategories',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminCategorieeController.serarchCategories
)
router.post('/add',
    authController.cheekToken,
    authController.cheekisAdmin,
    uploadSingleImage('image'),
    addCateValidation,
    adminCategorieeController.addCategoriee
)
router.get('/:id?',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminCategorieeController.getSpicificCategoriee
)
router.put('/update/:id?',
    authController.cheekToken,
    authController.cheekisAdmin,
    uploadSingleImageOptinal('image'),
    adminCategorieeController.editCategoriee
)
// router.delete('/delete/:id?',
//     authController.cheekToken,
//     authController.cheekisAdmin,
//     adminCategorieeController.deleteCategoriee

module.exports=router