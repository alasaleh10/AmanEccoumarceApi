const Product = require('./ProductModel');
const OrderItem = require('../orders/OrderItemsModel');
const Category = require('../Categories/Models/categorieModel');


Product.hasMany(OrderItem, { foreignKey: 'product', as: 'orderitems' });
OrderItem.belongsTo(Product, { foreignKey: 'product', as: 'items' });
Product.belongsTo(Category, { foreignKey: 'categoriee', as: 'categorys' });
module.exports = { Product, OrderItem };