const fs = require('fs');
const expressHandler = require('express-async-handler');
const { Op } = require('sequelize');
const Product = require('../../Features/Products/ProductModel');
const resizedImageOneFromList = require('../../helpers/resizedImageOneFromList');
const resizedImages = require('../../helpers/ResizedMulterImages');
const resizedImage = require('../../helpers/resizedImage');
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
  
  getOneProduct=expressHandler(async(req,res,next)=>{
    if(!req.params.id) return res.status(400).json({status:false,message:'يجب عليك ادخال رقم المنتج'})
    const id=req.params.id
    const product = await Product.findOne({
      where: { id },
      include: [
        {
          model: productsImages,
          as: 'images' }
      ]
    });
    if(!product) return res.status(400).json({status:false,message:'هذا المنتج غير موجود'})
    
   product.dataValues.priceAfterDiscount = product.price - ((product.discount / 100) * product.price);

      product.images=product.images.map(image=>{
       
        delete image.dataValues.productId;
        image.dataValues.imag=`${process.env.BASE_URL}/storage/products/${image.imag}`
        return image});
    return res.status(200).json({status:true,product:product})
  })

  editProduct=expressHandler(async(req,res,next)=>{
    if(!req.params.id) return res.status(400).json({status:false,message:'يجب عليك ادخال رقم المنتج'})
    const id=req.params.id
    const data = req.body;
    const product = await Product.findOne({ where: { id } });
    if(!product) return res.status(400).json({status:false,message:'هذا المنتج غير موجود'})

      if(req.file)
        {
          const filename = await resizedImage(req, 'products',95,1000,1000);
            const imageName = product.image.split('products/')[1];
            fs.unlinkSync(`storage/products/${imageName}`);
            data.image=filename

        }
  await  product.update(data);
    return res.status(200).json({status:true,message:`تم تعديل المنتج ${product.name} بنجاح`})
    })

  }
module.exports=AdminProductsController

