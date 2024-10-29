const express = require('express');
const router = express.Router();
const AuthController = require('../../Features/Auth/Controller/AuthController');
const authController=new AuthController();
const NotificationConroller = require('../../Features/Notifications/NotificationController');
const notificationConroller=new NotificationConroller();
const {addNotificationValidation} = require('../../Features/Notifications/NotificationValidations');
const {uploadSingleImageOptinal} = require('../../Middleware/UploadOptinalImageMiddelware');

router.post('/addNotification',
    authController.cheekToken,
    authController.cheekisAdmin,
    uploadSingleImageOptinal('image'),
    addNotificationValidation,
  
    notificationConroller.addNotification
)



module.exports=router