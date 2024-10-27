const moment = require('moment-timezone');
const { DataTypes  } = require('sequelize');
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
   
    
    
     
},
{timestamps:true,
    tableName: 'cart',
    hooks:{
        beforeCreate: async (cart) =>{
            const now = moment().tz('Asia/Riyadh').format();

            cart.createdAt = now;
            cart.updatedAt = now;

        },
        beforeUpdate : async (cart) =>{
            const now = moment().tz('Asia/Riyadh').format();
            cart.updatedAt = now;
        }
    }

})
Cart.belongsTo(Product, { foreignKey: 'product', as: 'products' });
module.exports = Cart;