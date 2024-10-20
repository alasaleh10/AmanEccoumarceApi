const expressHandler = require('express-async-handler');
const { Op,Sequelize } = require('sequelize');
const Product = require('../Products/ProductModel');
const Banar = require('../Banars/Model/banarModel');
const Favorite=require('../Favorite/FavoriteModel');
const Categoriees = require('../Categories/Models/categorieModel');
const Location = require('../locations/LocationModel');
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

    getHomeData=expressHandler(async(req,res)=>{
      const userId=req.user ? req.user.id : null
      let locationName;

      if(userId)
        {
          const location=await Location.findOne({where:{user:userId,isMain:true}});
          if(location) locationName=location.street

        }
      
      
      const banars = await Banar.findAll({
        limit: 5,
        order: Sequelize.literal('DBMS_RANDOM.VALUE') 
      });
      banars.map(banar => {
        banar.dataValues.image = `${process.env.BASE_URL}/storage/banars/${banar.dataValues.image}`;
        delete banar.dataValues.id;
        return banar.dataValues;
      })
      const categorie=await Categoriees.findAll({ where: { isActive: true }, 
         limit: 6, order: Sequelize.literal('DBMS_RANDOM.VALUE')})
      categorie.map(categoriee => {
        delete categoriee.dataValues.createdAt;
        delete categoriee.dataValues.updatedAt;
        delete categoriee.dataValues.isActive;
        
        categoriee.dataValues.image = `${process.env.BASE_URL}/storage/categories/${categoriee.dataValues.image}`;
       
        return categoriee.dataValues;
      })


      const products = await Product.findAll({
        attributes: {
          include: [
            [Sequelize.literal(`(SELECT COUNT(*) FROM "order_items" WHERE "order_items"."product" = "products"."id")`), 'salesCount'] 
          ],
        },
        where: {
          isActive: true 
        },
        group: ['products.id', 'products.name', 'products.image', 'products.subName', 'products.description', 'products.price', 'products.quilty', 'products.isActive', 'products.discount', 'products.categoriee', 'products.isNew', 'products.createdAt', 'products.updatedAt'], // تأكد من إضافة جميع الحقول هنا
        having: Sequelize.literal(`(SELECT COUNT(*) FROM "order_items" WHERE "order_items"."product" = "products"."id") > 0`), 
        order: [
          [Sequelize.literal(`(SELECT COUNT(*) FROM "order_items" WHERE "order_items"."product" = "products"."id")`), 'DESC'] 
        ],
        limit: 8
      });
      
      const bestSellingProducts = await Promise.all(products.map(async product => {
        product.dataValues.isFavorite = userId
          ? !!(await Favorite.findOne({ where: { user: userId, product: product.id } }))
          : false;
        product.dataValues.priceAfterDiscount = product.price - ((product.discount / 100) * product.price);
        product.dataValues.image = `${process.env.BASE_URL}/storage/products/${product.dataValues.image}`;
        
        return product.dataValues;
      }));

      // const getMonthlyProducts=await Product.findAll({where:{createdAt: 
      //   { [Op.gt]: new Date(new Date().setMonth(new Date().getMonth() - 1)) }},limit: 8, order: Sequelize.literal('DBMS_RANDOM.VALUE') })
      
      // return res.status(200).json({ status: true,locationName, banars, categorie, bestSellingProducts });
      
      
      
      
      
      
      
      
      
      

    })
}
module.exports=HomeController