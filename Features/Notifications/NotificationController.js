const moment = require('moment-timezone');
const expressHandler = require('express-async-handler');
const {Op} = require('Sequelize');
const Notification = require('./NotificationModel');
const resizedImage = require('../../helpers/resizedImage');
class NotificationController{

    //  adding just for admin
    addNotification=expressHandler(async(req,res,next)=>{
        const data=req.body
        if(req.file)
            {
                const filename = await resizedImage(req, 'notifications',95,1000,1000);
                data.image=filename

            }
       
        const notification=await Notification.create({...data})
        delete notification.dataValues.createdAt;
        delete notification.dataValues.updatedAt;
        res.status(200).json({status:true,message:'تم اضافة الاشعار بنجاح'})
    })

    getNotifications=expressHandler(async (req,res,next)=>{
        const userId = req.user ? req.user.id : null;

        const notifications = await Notification.findAll({
          where: {
            [Op.or]: [
              { user: null },        
              ...(userId ? [{ user: userId }] : [])  
            ]
          },order: [['id', 'DESC']]
        },);
        notifications.forEach(notification => {
          delete notification.dataValues.user;
          delete notification.dataValues.updatedAt;
       
        });
        
        res.status(200).json({ status: true, notifications });
        
   } )

    
}
module.exports=NotificationController