const expressHandler = require('express-async-handler');
const sendFailure = require('../../utils/ResponseHepler/SendFailureResponse');
const resizedImageOneFromList = require('../../helpers/resizedImageOneFromList');
const resizedImages = require('../../helpers/ResizedMulterImages');
const Product = require('./ProductModel');
const productsImages = require('./productImagesModel');
const Favorite = require('../Favorite/FavoriteModel');
class ProcuctController{

    addProduct=expressHandler(async(req,res,next)=>{
   

    const data = req.body;

if (!req.files['image']) {
  return res.status(400).json({ status: false, message: "يجب رفع الصورة الرئيسية" });
}


const mainImageFilename = await resizedImageOneFromList(req, 'products', 50, 1000, 1000);

const product = await Product.create({ ...data, image: mainImageFilename });
product.image=`${process.env.BASE_URL}/storage/products/${mainImageFilename}`


let productImages = [];


if (req.files.imag) {
  const images = await resizedImages(req.files.imag, 'products');
  
  for (const img of images) {
    const productImage = await productsImages.create({ productId: product.id, imag: img });
    productImages.push({ id: productImage.id, imag: `${process.env.BASE_URL}/storage/products/${img}` });
  }
}

// الاستجابة النهائية
res.status(201).json({
  status: true,
  message: "تم اضافة المنتج بنجاح",
  product: {
    ...product.dataValues,  
    images: productImages 
  }
});


    
  });

  getProductsByCategoriees=expressHandler(async(req,res)=>{
    const { id } = req.params;
    const userId = req.user ? req.user.id : null; 
    
  
    const products = await Product.findAll({ where: { categoriee: id, isActive: true } });
    
    if (products.length === 0) {
        return sendFailure(res, 400, 'لايوجد منتجات');
    }
    
    let favoriteProductIds = [];
    if (userId) {
   
        const favorites = await Favorite.findAll({
            where: { user: userId },
            attributes: ['product'], 
        });
        favoriteProductIds = favorites.map(fav => fav.product); 
    }
    
    const productss = products.map(product => {
  
        product.dataValues.image = `${process.env.BASE_URL}/storage/products/${product.dataValues.image}`;
        

        product.dataValues.priceAfterDiscount = product.price - ((product.discount / 100) * product.price);
    
        product.dataValues.isFavorite = userId ? favoriteProductIds.includes(product.id) : false;

        delete product.dataValues.createdAt;
        delete product.dataValues.updatedAt;
        delete product.dataValues.isActive;
        delete product.dataValues.isNew;
        delete product.dataValues.categoriee;
    
        return product.dataValues;
    });
    
    res.status(200).json({ status: true, products: productss });
    

  })

  getNewAmanProducts=expressHandler(async(req,res)=>{
    const userId = req.user ? req.user.id : null; 

    const products = await Product.findAll({ where: { isNew: true, isActive: true } });
    if (products.length === 0) {
      return sendFailure(res, 400, 'لايوجد منتجات');
  }
  
  let favoriteProductIds = [];
  if (userId) {
 
      const favorites = await Favorite.findAll({
          where: { user: userId },
          attributes: ['product'], 
      });
      favoriteProductIds = favorites.map(fav => fav.product); 
  }
  
  const productss = products.map(product => {

      product.dataValues.image = `${process.env.BASE_URL}/storage/products/${product.dataValues.image}`;
      

      product.dataValues.priceAfterDiscount = product.price - ((product.discount / 100) * product.price);
  
      product.dataValues.isFavorite = userId ? favoriteProductIds.includes(product.id) : false;

      delete product.dataValues.createdAt;
      delete product.dataValues.updatedAt;
      delete product.dataValues.isActive;
      delete product.dataValues.isNew;
      delete product.dataValues.categoriee;
  
      return product.dataValues;
  });
  
  res.status(200).json({ status: true, products: productss });
  })


}
module.exports=ProcuctController;