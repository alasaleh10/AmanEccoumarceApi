// // // const { DataTypes } = require('sequelize');
// // // const { sequelize } = require('../../Config/database');
// // // const Product = require('../Products/ProductModel');
// // // const OrderItem = sequelize.define('order_items', {
// // //     id: {
// // //         type: DataTypes.INTEGER,
// // //         primaryKey: true,
// // //         autoIncrement: true
// // //     },
// // //     order: {
// // //         type: DataTypes.INTEGER,
// // //         allowNull: false
// // //     },
// // //     product: {
// // //         type: DataTypes.INTEGER,
// // //         allowNull: false
// // //     },
// // //     quantity: {
// // //         type: DataTypes.INTEGER,
// // //         allowNull: false
// // //     },
// // //     price: {
// // //         type: DataTypes.INTEGER,
// // //         allowNull: false
// // //     }

// // // },

// // // {timestamps:false})


// // // module.exports=OrderItem
    
// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../../Config/database');
// const Product = require('../Products/ProductModel');

// const OrderItem = sequelize.define('order_items', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     order: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     product: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     price: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// }, {timestamps: false});
// // OrderItem.hasMany(Product, { foreignKey: 'id', sourceKey: 'product' });

// module.exports = OrderItem;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/database');
const Product = require('../Products/ProductModel');

const OrderItem = sequelize.define('order_items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });
OrderItem.belongsTo(Product, { foreignKey: 'product', as: 'productDetails' });
module.exports = OrderItem;
