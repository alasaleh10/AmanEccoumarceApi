const expressHandler = require('express-async-handler');
const { Op } = require('sequelize');
const Cart = require('./CartModel');
const Product = require('../Products/ProductModel');
const Favorite = require('../Favorite/FavoriteModel');
const Location = require('../locations/LocationModel');
const User = require('../Auth/Models/UserModel');
const ApiErro = require('../../utils/ApiError');
const calculateDistance = require('../../helpers/distance');

class CartController
{
  getMyCart = expressHandler(async (req, res, next) => {
    const id = req.user.id;
    let totalPrice = 0;
    let productPriceTotal=0;

    const cart = await Cart.findAll({
        where: { user: id },
        include: [
            {
                model: Product,
                as: 'products',
                attributes: ['id', 'name', 'subName', 'price', 'image', 'quilty', 'discount'],
                where: {
                    isActive: true,
                    quilty: { [Op.gt]: 0 },
                },
                order: [['id', 'ASC']],
            },
        ],
    });

    const cartItems = await Promise.all(cart.map(async item => {
        const favorite = await Favorite.findOne({
            where: { user: id, product: item.products.id },
        });

        if (item.products.discount == 0) {
            totalPrice += item.products.price * item.quantity;
        } else {
            totalPrice += (item.products.price - ((item.products.discount / 100) * item.products.price)) * item.quantity;
        }

      
        return {
            id: item.products.id,
            name: item.products.name,
            subName: item.products.subName,
            price: item.products.price,
            image: `${process.env.BASE_URL}/storage/products/${item.products.image}`,
            quilty: item.products.quilty,
            discount: item.products.discount,
            isFavorite: favorite !== null,
            productTotal: (item.products.price - ((item.products.discount / 100) * item.products.price))* item.quantity,
            priceAfterDiscount: item.products.price - ((item.products.discount / 100) * item.products.price),
            quantity: item.quantity
        };
    }));

    res.status(200).json({ status: true, cartItems, totalPrice });
});

  

    addToCart=expressHandler(async(req,res,next)=>{
            const id=req.user.id;
            const product=req.body.product;
           const quantity = req.body.quantity ?? 1;
           const oldCart=await Cart.findOne({where:{user:id,product:product}});
           const oldProduct=await Product.findOne({where:{id:product}})


      if(oldCart)
        {
          if(oldProduct.quilty<oldCart.quantity+quantity)
          {
            return res.status(400).json({ status: false, message: "الكمية المطلوبة غير متوفرة" });
          }
          await Cart.update({quantity:oldCart.quantity+quantity},{where:{user:id,product:product}})
          res.status(201).json({status:true,message:"تم الاضافة بنجاح"})
        }
        else
        {
          if(oldProduct.quilty<quantity)
            {
              return res.status(400).json({ status: false, message: "الكمية المطلوبة غير متوفرة" });
            }
          await Cart.create({user:id,product:product,quantity:quantity})
          res.status(201).json({status:true,message:"تم الاضافة بنجاح"})

          }    
    })

    editCart=expressHandler(async(req,res,next)=>{

        const id=req.user.id;
        const product=req.body.product;


    })

  addOneToCart=expressHandler(async(req,res,next)=>{

        const id=req.user.id;
        const productId=req.body.product;
        const product=await Product.findOne({where:{id:productId}})
        const oldCart = await Cart.findOne({where:{user:id,product:productId}});
        if(oldCart)
          {
            if(oldCart.quantity+1 >product.quilty)
            {
              return res.status(400).json({ status: false, message: "الكمية المطلوبة غير متوفرة" });
            }
            await Cart.update({quantity:oldCart.quantity+1},{where:{user:id,product:productId}})
            res.status(201).json({status:true,message:"تم الاضافة بنجاح"})

          }
          else
          {
            if(product.quantity>product.quilty+1)
              {
                return res.status(400).json({ status: false, message: "الكمية المطلوبة غير متوفرة" });
              }
            
            await Cart.create({user:id,product:productId,quantity:1})
            res.status(201).json({status:true,message:"تم الاضافة بنجاح"})
          }
    })


  deleteFromCart=expressHandler(async(req,res,next)=>{

        const id=req.user.id;
        const productId=req.body.product;
        const oldCart=await Cart.findOne({where:{user:id,product:productId}});
        const oldCount=oldCart.quantity;
        if(oldCount==1)
          {
            await Cart.destroy({where:{user:id,product:productId}})
            res.status(201).json({status:true,message:"تم الحذف بنجاح"})
          }
          else
          {
            await Cart.update({quantity:oldCount-1},{where:{user:id,product:productId}})
            res.status(201).json({status:true,message:"تم الحذف بنجاح"})
          }
  })  

  getCartDelivery=expressHandler(async(req,res,next)=>{

    const id=req.user.id;
    const location=await Location.findOne({where:{isMain:true,user:id}});

    if(!location)
      {
res.status(400).json({status:false,message:"يجب تحديد الموقع الرئيسي"})
      }
      else{
        const delivery=calculateDistance(location.lat,location.lng);
       
        res.status(200).json({status:true,location,delivery});
      }
    
  })
  
  cheekMyWallet=expressHandler(async(req,res)=>{
    const {total}=req.body;
    const user=await User.findOne({where:{id:req.user.id}});

    if(user.credit<total)
      {
        return res.status(400).json({status:false,message:`رصيد هو ${user.credit} و المبلغ المطلوب ${total}`});
      }
      res.status(200).json({status:true,message:"تم التحقق بنجاح"});

 })

  cheekCartItemsQuantity = expressHandler(async (req, res) => {
  const id = req.user.id;
  

  const cart = await Cart.findAll({ where: { user: id, status: 0 } });

  for (const element of cart) {
    const product = await Product.findOne({ where: { id: element.product } });
    
    if ( !product.isActive) {
      return res.status(400).json({
        status: false,
        message: `المنتج ${product.name} لم يعد متوفر `
      });
    }
      
    if(element.quantity>product.quilty)
      {
return res.status(400).json({ status: false, message: `الكمية المتبقية من المنتج ${product.name} هي ${product.quilty}` });
      }
  }

  
  return res.status(200).json({
    status: true,
    message: "تم التحقق بنجاح",
  });
});


}
module.exports=CartController


