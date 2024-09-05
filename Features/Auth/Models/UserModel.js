const moment = require('moment-timezone');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
// const { sequelize } = require('../../../Config/database');
const { sequelize } = require('../../../Config/database'); 



const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    virifyCode:{
        type:DataTypes.STRING
    },
    expireCodeDate:{
        type:DataTypes.DATE
    },
    credit:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    points:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    image:{
        type:DataTypes.STRING,
        defaultValue:"defualtUserImage.jpeg"
    },
    isApproved:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    passwordUpdatedAt:{
        type:DataTypes.DATE
    }


},  
    {
        timestamps: true,
        hooks:
        {
            // afterUpdate: async (user) => {
              
            
            // },

            beforeCreate:async (user) => {
      const now = moment().tz('Asia/Aden').format(); 

                let code = Math.floor(10000 + Math.random() * 90000).toString();
                console.log(code);
                
                const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
                user.virifyCode=hashedCode;
                      
                user.password =  await bcrypt.hash(user.password, 10);
               
                user.expireCodeDate =Date.parse(moment().tz('Asia/Aden').add(5, 'minutes'));
                user.createdAt=now;
                user.updatedAt=now;
                user.passwordUpdatedAt=now;
            },
          
            
            
        
        
        }

    }


);
module.exports = User;