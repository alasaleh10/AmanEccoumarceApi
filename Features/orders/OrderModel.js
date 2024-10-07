const moment = require('moment-timezone');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/database');
const OrderItem = require('../orders/OrderItemsModel');
const Order=sequelize.define('orders',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    coupon:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    isDelivery:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    },
    deliveryPrice:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    totalCart:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    totalOrder:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    preparingDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    location:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    paymentType:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    deliveryDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    recivedDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
},
{
    timestamps: true,
    beforeCreate: async (order) => 
        {
            order.createdAt = moment().tz('Asia/Aden').format();
            order.updatedAt = moment().tz('Asia/Aden').format();
            
        },
        befupdate: async (order) => 
        {
            order.updatedAt = moment().tz('Asia/Aden').format();
            
        }
    
}

)
Order.hasMany(OrderItem, { foreignKey: 'order', as: 'orderItems' });

module.exports = Order