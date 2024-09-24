const expressHandler = require('express-async-handler');
const { Op } = require('sequelize');
const Product = require('../Products/ProductModel');
class HomeController
{
    searchProduct=expressHandler(async(req,res)=>{
        const {search}=req.query;
        const products = await Product.findAll({
            where: {
              name: {
                [Op.like]: `%${search}%`,
              },
              isActive:true
              
            },
          });
                
          if(products.length==0)   return res.status(400).json({ status: false, message: "لايوجد منتجات" }); 
            
            
           const productss=products.map(product => {

                product.dataValues.image = `${process.env.BASE_URL}/storage/products/${product.dataValues.image}`;
      product.dataValues.priceAfterDiscount = product.price - ((product.discount / 100) * product.price);

                delete product.dataValues.createdAt;
                delete product.dataValues.updatedAt;
                delete product.dataValues.isActive;
                delete product.dataValues.isNew;
                delete product.dataValues.categoriee;

                return product.dataValues;

            })


          return res.status(200).json({ status: true, products:productss });

    })
}
module.exports=HomeController