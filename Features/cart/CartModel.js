const { DataTypes ,Sequelize } = require('sequelize');
const { sequelize } = require('../../Config/database');
const Product = require('../Products/ProductModel');
const Cart=sequelize.define('cart',{
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
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    },
  
    status:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Aden'`),
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Aden'`),
    }
    
    
     
},
{timestamps:false,
    tableName: 'cart'

})
Cart.belongsTo(Product, { foreignKey: 'product', as: 'products' });
module.exports = Cart;