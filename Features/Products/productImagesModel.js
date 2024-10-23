const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/database');
const Product = require('../Products/ProductModel');

const ProductImage = sequelize.define('productImages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imag: {
        type: DataTypes.STRING, 
        allowNull: false 
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: Product,
            key: 'id'
        }
    }
}, { timestamps: false,
//     hooks: {
//         afterFind: (productImage) => {
         
            
//             if(Array.isArray(productImage))
//                 {
//                     productImage.forEach((productImage) => {
//                         productImage.dataValues.imag=`${process.env.BASE_URL}/storage/products/${productImage.imag}`
                      
//                     })

//                 }
//                 else if(productImage)
//                     {
//                         productImage.dataValues.imag=`${process.env.BASE_URL}/storage/products/${productImage.imag}`
//                     }
//  }
//            }
 }
);

module.exports = ProductImage;




