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
        type: DataTypes.STRING(4000),
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
   
}, {
    timestamps: true,
    hooks: {
        beforeCreate: (product) => {
            const now = moment().tz('Asia/Riyadh').format();
            product.createdAt = now;
            product.updatedAt = now;
        },

        beforeUpdate: (product) => {
            const now = moment().tz('Asia/Riyadh').format();
            product.updatedAt = now;
        },
        afterFind: (product) => 
            {
                if(Array.isArray(product))
                    {
                        product.forEach((product) => {
                            product.dataValues.createdAt=moment(product.dataValues.createdAt).tz('Asia/Riyadh').format();
                            product.dataValues.updatedAt=moment(product.dataValues.updatedAt).tz('Asia/Riyadh').format();

                            product.dataValues.image=`${process.env.BASE_URL}/storage/products/${product.image}`
                        });

                    }
                    else if(product)
                    {
                        product.createdAt=moment(product.dataValues.createdAt).tz('Asia/Riyadh').format();

                        product.dataValues.image=`${process.env.BASE_URL}/storage/products/${product.image}`
                    }



            }
    }
});

Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });

module.exports = Product;
