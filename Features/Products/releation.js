const Product = require('./ProductModel');
const OrderItem = require('../orders/OrderItemsModel');


Product.hasMany(OrderItem, { foreignKey: 'product', as: 'orderitems' });
OrderItem.belongsTo(Product, { foreignKey: 'product', as: 'items' });

module.exports = { Product, OrderItem };