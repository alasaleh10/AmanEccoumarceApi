const moment = require('moment-timezone');
const { DataTypes } = require('sequelize');

const { sequelize } = require('../../Config/database');
const Product=sequelize.define('products',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING   
    },
    subName:{
        type:DataTypes.STRING,
        
    },
    description:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.INTEGER
    },
    image:{
        type:DataTypes.STRING
    },
    quilty:{
        type:DataTypes.INTEGER
    },  
    isActive:{
        type:DataTypes.BOOLEAN ,
        defaultValue:true 
    },
    discount:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    isNew:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    categoriee:{
        type:DataTypes.INTEGER
    },
    createdAt:{
        type:DataTypes.STRING,
        defaultValue:moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss')
    },
    updatedAt:{
        type:DataTypes.STRING,
        defaultValue:moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss')
    }
},{
    timestamps:false,

    beforeUpdate: (product) => {
        const now = moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss');
        product.updatedAt = now;
    }
    


})  
module.exports = Product