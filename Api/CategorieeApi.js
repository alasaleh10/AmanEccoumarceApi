const express = require('express');
const router = express.Router();
const CategorieeController = require('../Features/Categories/Controller/CategorieeController');
const AuthController = require('../Features/Auth/Controller/AuthController');
const addCateValidation = require('../Features/Categories/Validations/AddCategrorieeValidation');
const {uploadSingleImage} = require('../Middleware/UploadImageMiddelware');
const authController = new AuthController();
categorieeController=new CategorieeController();


router.get('/all',
    categorieeController.getAllCatergoriees
);

 router.post('/add',
        authController.cheekToken,
        authController.cheekisAdmin,
        uploadSingleImage('image'),
        addCateValidation,
        categorieeController.addCategoriee
    )



module.exports=router;