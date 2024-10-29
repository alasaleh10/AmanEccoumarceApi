const express = require('express');
const router = express.Router();
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController=new AuthController();
const NotificationController = require('../Features/Notifications/NotificationController');
const notificationController=new NotificationController();


router.get('/',
    authController.optinalToken,
    notificationController.getNotifications

)



module.exports=router