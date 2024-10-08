const moment = require('moment-timezone');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/database');
const ProductImage = require('./productImagesModel');
const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subName: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quilty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isNew: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    categoriee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: moment().tz('Asia/Aden').format('YYYY-MM-DD HH:mm:ss')
    },
    updatedAt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: moment().tz('Asia/Aden').format('YYYY-MM-DD HH:mm:ss')
    }
}, {
    timestamps: false,
    hooks: {
        beforeUpdate: (product) => {
            const now = moment().tz('Asia/Aden').format('YYYY-MM-DD HH:mm:ss');
            product.updatedAt = now;
        }
    }
});

Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
module.exports = Product;
