const expressHandler = require('express-async-handler');
const Favorite = require('../Favorite/FavoriteModel');
const sendFailure = require('../../utils/ResponseHepler/SendFailureResponse');
const Product = require('../Products/ProductModel');
class FavoriteController
{

    addFavorite=expressHandler(async(req,res)=>{
  
        const userid=req.user.id;
        const productid=req.body.product;

     const favorite =  await Favorite.findOne({where:{user:userid,product:productid}});

     if(favorite)
        {
            return res.status(200).json({ status: true, message: "تم اضافة المنتج الى المفضلة" });
            
        }
       
            await Favorite.create({user:userid,product:productid});
            return res.status(200).json({ status: true, message: "تم اضافة المنتج الى المفضلة" });

        

    });

    deleteFavorite=expressHandler(async(req,res)=>{
        const userid=req.user.id;
        const productid=req.body.product;

        await Favorite.destroy({where:{user:userid,product:productid}});
        return res.status(200).json({ status: true, message: "تم حذف المنتج من المفضلة" });
    });


    getMyFavorite=expressHandler(async(req,res)=>{
        const userid=req.user.id;

        const favorite = await Favorite.findAll({
            where: { user: userid },
            include: {
              model: Product,
              as: 'products',
              where: {
                isActive: true,  
              },
            },
          });

       
        if(favorite.length==0)
        {
            return sendFailure(res,400,'لايوجد منتجات في المفضلة');
        }
        // const products = favorite.map(fav => fav.products);
        const products = favorite.map(fav => {
            const product = fav.products;
            product.image = `${process.env.BASE_URL}/storage/products/${product.image}`; 
            product.dataValues.isFavorite=true;
            product.dataValues.priceAfterDiscount=product.dataValues.price-((product.dataValues.price*product.dataValues.discount)/100)
            delete product.dataValues.categoriee;
            delete product.dataValues.isNew;
            delete product.dataValues.createdAt;
            delete product.dataValues.updatedAt;
            return product;
        });

        return res.status(200).json({ status: true, products:products });

    });
    
    

}
module.exports=FavoriteController