const express = require('express');
const router = express.Router();
const CategorieeController = require('../Features/Categories/Controller/CategorieeController');
// const AuthController = require('../Features/Auth/Controller/AuthController');

// const authController = new AuthController();
categorieeController=new CategorieeController();


router.get('/all',
    categorieeController.getAllCatergoriees
);





module.exports=router;