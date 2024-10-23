const moment = require('moment-timezone');
const { DataTypes } = require('sequelize');

const { sequelize } = require('../../Config/database');  

const Coupon=sequelize.define('coupons',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    discount:{
        type:DataTypes.INTEGER,
        allowNull:false

    },
    count:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    },
    expire:{
        type:DataTypes.DATE,
        allowNull:false
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
}
,{
    timestamps:false,
    hooks:{
       afterFind: (coupon) => {

        if(Array.isArray(coupon))
            {
                coupon.forEach((c) => {
                    c.dataValues.expire=moment(c.expire).tz('Asia/Riyadh').format();
                });

            }
            else if(coupon)
                {
                    coupon.dataValues.expire=moment(coupon.expire).tz('Asia/Riyadh').format();

                }


          
       }
    }
}
)
module.exports = Coupon  