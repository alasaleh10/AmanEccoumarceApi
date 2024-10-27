const moment = require('moment-timezone');
const { DataTypes } = require('sequelize');

const { sequelize } = require('../../Config/database');  

const Rating=sequelize.define('rating_orders',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    feadback:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    comment:{
        type:DataTypes.STRING(500),
        allowNull:true
    },
    order:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    user:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
 



},{
    timestamps:true,
    hooks:
    {
        beforeCreate: (rating) => {
            const now = moment().tz('Asia/Riyadh').format();
            rating.createdAt =now;
            rating.updatedAt =now;
        },
        beforeUpdate: (rating) => {
            const now = moment().tz('Asia/Riyadh').format();
            rating.updatedAt =now;
        }
    }
})

module.exports = Rating