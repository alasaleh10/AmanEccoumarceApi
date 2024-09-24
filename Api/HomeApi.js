const express = require('express');
const router = express.Router();
const {searchValidation} = require('../Features/Home/HomeValidation');
const HomeController = require('../Features/Home/HomeController');
homeController=new HomeController();


router.get('/searchProduct',
    searchValidation,
    homeController.searchProduct
    );





module.exports=router;