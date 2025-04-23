const Product = require('./ProductModel');
const OrderItem = require('../orders/OrderItemsModel');
const Category = require('../Categories/Models/categorieModel');
const User = require('../Auth/Models/UserModel');
const Order = require('../orders/OrderModel');
// 

Product.hasMany(OrderItem, { foreignKey: 'product', as: 'orderitems' });
OrderItem.belongsTo(Product, { foreignKey: 'product', as: 'items' });
Product.belongsTo(Category, { foreignKey: 'categoriee', as: 'categorys' });



User.hasMany(Order, { foreignKey: 'user', as: 'userData' }); 
Order.belongsTo(User, { foreignKey: 'user', as: 'userData' }); 

module.exports = { Product, OrderItem , Category, User, Order };