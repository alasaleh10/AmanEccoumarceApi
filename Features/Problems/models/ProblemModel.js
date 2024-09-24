const { DataTypes } = require('sequelize');
const moment = require('moment-timezone');
const { sequelize } = require('../../../Config/database');
const Problem=sequelize.define('problems',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    type:{
        type:DataTypes.STRING
    },
    title:{
        type:DataTypes.STRING    
    },
    discription:{
        type:DataTypes.STRING,
        allowNull:true
    },
    isNew:{
        type:DataTypes.BOOLEAN, 
        defaultValue:true,
        allowNull:false
    },
    user:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    createdAt:{
        type:DataTypes.STRING,
        defaultValue:moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss')
    },
    updatedAt:{
        type:DataTypes.STRING,
        defaultValue:moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss')
    }
},
{timestamps:false},
this.beforeUpdate=(problem)=>{
    const now = moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss');
    problem.updatedAt = now;
}
)

module.exports = Problem;