const expressHandler = require('express-async-handler');
const {Sequelize} = require('sequelize');
const sendFailure = require('../../utils/ResponseHepler/SendFailureResponse');
const Product = require('./ProductModel');
const productsImages = require('./productImagesModel');
const Favorite = require('../Favorite/FavoriteModel');

class ProcuctController{

    

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
  });

   getSpicificProduct = expressHandler( async (req, res) => {
   
    
      const { id } = req.params;
      const userId = req.user ? req.user.id : null;
   
     
      const product = await Product.findOne({
        where: { id },
        include: [
          {
            model: productsImages,
            as: 'images' }
        ]
      });
       
      product.dataValues.priceAfterDiscount = product.price - ((product.discount / 100) * product.price);

      product.dataValues.isFavorite = userId
      ? !!(await Favorite.findOne({ where: { user: userId, product: id } }))
      : false;


  product.images=product.images.map(image=>{
    delete image.dataValues.productId;
    delete image.dataValues.id;

    image.dataValues.imag=`${process.env.BASE_URL}/storage/products/${image.imag}`
    return image});

    const similarProducts = await Product.findAll({
      where: {
        categoriee: product.categoriee,
        id: { [Sequelize.Op.ne]: product.id }
      },
      limit: 5
    });


    const updatedSimilarProducts = await Promise.all(
      similarProducts.map(async similarProduct => {
        similarProduct.dataValues.image = `${process.env.BASE_URL}/storage/products/${similarProduct.dataValues.image}`;
        similarProduct.dataValues.priceAfterDiscount = similarProduct.price - ((similarProduct.discount / 100) * similarProduct.price);
        delete similarProduct.dataValues.createdAt;
        delete similarProduct.dataValues.updatedAt;
        delete similarProduct.dataValues.isActive;
        delete similarProduct.dataValues.isNew;
        
        delete similarProduct.dataValues.categoriee;
        if (userId) {
          const favorite = await Favorite.findOne({ where: { user: userId, product: similarProduct.id } });
          similarProduct.dataValues.isFavorite = !!favorite;
        } else {
          similarProduct.dataValues.isFavorite = false;
        }

        return similarProduct;
      })
    );
    res.status(200).json({
      status: true,
      product,
      similarProducts: updatedSimilarProducts
    });
   
  });
  



}
module.exports=ProcuctController;