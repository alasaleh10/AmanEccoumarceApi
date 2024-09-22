const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/database');
const Product  = require('../Products/ProductModel');
const Favorite=sequelize.define('favorites',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    product:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},
{timestamps:false})
Favorite.belongsTo(Product, { foreignKey: 'product', as: 'products' });
module.exports = Favorite;


