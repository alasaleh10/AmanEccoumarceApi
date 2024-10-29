const moment = require('moment-timezone');

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/database');

const Notification=sequelize.define('notifications',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    body:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    user:{
        type:DataTypes.INTEGER,
        allowNull:true
    },

    image:{
        type:DataTypes.STRING,
        allowNull:true

    }

},{timestamps:true,
hooks:{
    beforeCreate:(notification)=>{
        notification.createdAt=moment().tz("Asia/Riyadh").format();
        notification.updatedAt=moment().tz("Asia/Riyadh").format();
    },
    beforeUpdate:(notification)=>{
        notification.updatedAt=moment().tz("Asia/Riyadh").format();
    },
    afterFind:(notification)=>{
        if(Array.isArray(notification)){
            
            notification.forEach((notification)=>{
                if(notification)
                    {
                        notification.dataValues.createdAt=moment(notification.createdAt).tz("Asia/Riyadh").format('YYYY-MM-DD HH:mm:ss');
                        
                    }
                if(notification.image)
                    {
                        notification.image=`${process.env.BASE_URL}/storage/notifications/${notification.image}`
                    }
                // notification.createdAt=moment(notification.createdAt).tz("Asia/Riyadh").format();
                // notification.updatedAt=moment(notification.updatedAt).tz("Asia/Riyadh").format();
            })



        }
        else if(notification){
            notification.dataValues.createdAt=moment(notification.createdAt).tz("Asia/Riyadh").format('YYYY-MM-DD HH:mm:ss');
            if(notification.image)
                {
                    notification.image=`${process.env.BASE_URL}/storage/notifications/${notification.image}`
                }

        // notification.createdAt=moment(notification.createdAt).tz("Asia/Riyadh").format();
        // notification.updatedAt=moment(notification.updatedAt).tz("Asia/Riyadh").format();
    }

}

}

})

module.exports=Notification