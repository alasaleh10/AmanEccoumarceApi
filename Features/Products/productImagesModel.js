const { DataTypes } = require('sequelize');

const { sequelize } = require('../../Config/database');

const ProductImage=sequelize.define('productImages',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    imag:{
        type:DataTypes.STRING
    },
    productId:{
        type:DataTypes.INTEGER
    }
},
{timestamps:false})
module.exports = ProductImage;