const expressHandler = require('express-async-handler');
const { Op } = require('sequelize');
const Product = require('../../Features/Products/ProductModel');
const resizedImageOneFromList = require('../../helpers/resizedImageOneFromList');
const resizedImages = require('../../helpers/ResizedMulterImages');
const productsImages = require('../../Features/Products/productImagesModel');
const Category = require('../../Features/Categories/Models/categorieModel');
class AdminProductsController{
    addProduct=expressHandler(async(req,res,next)=>{

        const data = req.body;
    
    if (!req.files['image']) {
      return res.status(400).json({ status: false, message: "يجب رفع الصورة الرئيسية" });
    }
    
    
    const mainImageFilename = await resizedImageOneFromList(req, 'products', 50, 1000, 1000);
    
    const product = await Product.create({ ...data, image: mainImageFilename });
    product.image=`${process.env.BASE_URL}/storage/products/${mainImageFilename}`

    if (req.files.imag) {
      const images = await resizedImages(req.files.imag, 'products');
      
      for (const img of images) {
       await productsImages.create({ productId: product.id, imag: img });
       
      }
    }
    
    
    res.status(201).json({
      status: true,
      message: "تم إضـافة المنتج بنجاح",
        });
   });

  getAllProdcuts=expressHandler(async(req,res,next)=>{
    const page = (req.query.page * 1) || 1; 
    const limit = 20;
    const skip = (page - 1) * limit;
    
    const products = await Product.findAll({
        

        offset: skip,
        limit: limit,
        attributes: ['id', 'name', 'image', 'quilty', 'isActive'],
        include: [{
            model: Category,
            as: 'categorys',
            attributes: ['name']
        }]
    });
   
    
    const formattedProducts = products.map(product => {
        const { categorys, ...productData } = product.get({ plain: true });
        return { ...productData, categorieName: categorys.name };
    });
    
    return res.status(200).json({ status: true, products: formattedProducts });
    
  }) 
  searchProducts=expressHandler(async(req,res,next)=>{

    if(!req.body.name) return res.status(400).json({status:false,message:'يجب عليك ادخال كلمة البحث'}) 
    const page = (req.query.page * 1) || 1; 
    const limit = 20;
    const skip = (page - 1) * limit;
    const name=req.body.name;
  
    
    
    const products = await Product.findAll({
        where : {
            name : {
                [Op.like] : `%${name}%`
            }
        },
        offset: skip,
        limit: limit,
        attributes: ['id', 'name', 'image', 'quilty', 'isActive'],
        include: [{
            model: Category,
            as: 'categorys',
            attributes: ['name']
        }]
    });
    // console.log(`length is ${products.length}`);
    
    if(products.length==0) return res.status(400).json({status:false,message:'لايوجد منتجات'})

    
    const formattedProducts = products.map(product => {
        const { categorys, ...productData } = product.get({ plain: true });
        return { ...productData, categorieName: categorys.name };
    });
    
    return res.status(200).json({ status: true, products: formattedProducts });
    
  }) 
    
}


module.exports=AdminProductsController

