const express = require('express');
const router = express.Router();
const BanarController = require('../Features/Banars/Controller/BanarController');
banarController=new BanarController();
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController = new AuthController();

const {uploadSingleImage} = require('../Middleware/UploadImageMiddelware');

router.post('/addBanar',
    authController.cheekToken,
    authController.cheekisAdmin,
    uploadSingleImage('image'),

    banarController.addBanar);


    module.exports=router;