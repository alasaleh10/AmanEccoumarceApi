const express = require('express');
const router = express.Router();
const BanarController = require('../Features/Banars/Controller/BanarController');
banarController=new BanarController();
const resizeBanar = require('../Features/Banars/Validations/resizeBanar');
const {uploadSingleImage} = require('../Middleware/UploadImageMiddelware');

router.post('/addBanar',
    uploadSingleImage('image'),
    resizeBanar,
    // banarValidation,
    banarController.addBanar);


    module.exports=router;