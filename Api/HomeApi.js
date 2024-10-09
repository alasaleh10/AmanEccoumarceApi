const express = require('express');
const router = express.Router();
const {searchValidation} = require('../Features/Home/HomeValidation');
const HomeController = require('../Features/Home/HomeController');
homeController=new HomeController();
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController = new AuthController();


router.get('/searchProduct',
    searchValidation,
    homeController.searchProduct
    );

 router.get('/',
        authController.optinalToken,
        homeController.getHomeData 
    );





module.exports=router;