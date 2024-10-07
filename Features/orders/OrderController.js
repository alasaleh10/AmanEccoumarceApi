const expressHandler = require('express-async-handler');
const moment = require('moment-timezone');
const { Op } = require('sequelize');
const {sequelize} = require('../../Config/database');
const Order = require('./OrderModel');
const Cart = require('../cart/CartModel');
const User = require('../Auth/Models/UserModel');
const Product = require('../Products/ProductModel');
const Coupon = require('../Coupons/CouponModel');
const OrderItem = require('./OrderItemsModel');
const Location = require('../locations/LocationModel');
class OrderController
{   

    addOrder=expressHandler(async(req,res,next)=>{

        const data = req.body;
   
        
        const userId=req.user.id;
        const order = await Order.create({ ...data, user: userId });
        if(data.paymentType===2)
          {
            await User.update(
              { credit: sequelize.literal(`"credit" - ${data.totalOrder}`) },
              { where: { id: userId } }
            );
            
           }
           if(data.coupon)
            {
              await Coupon.update(
                { count: sequelize.literal(`"count" - 1`) },
                { where: { id: data.coupon } }
              );
              const code = await Coupon.findOne({
                where: { id: data.coupon },
                attributes: ['count']  
              });
              if(code.count<=0)
                {
                  await Coupon.update({isActive:false},{where:{id:data.coupon}})
                }
              
            }

           await Promise.all(data.items.map(async (item) => {


            await OrderItem.create({ order: order.id, user: userId ,product:item.id,price:item.price,quantity:item.quantity});
            await Product.update(
              { quilty: sequelize.literal(`"quilty" - ${item.quantity}`) },
              { where: { id: item.id } }
            );
            const updatedProduct = await Product.findOne({ where: { id: item.id } });

         
            if (updatedProduct.quilty <= 0) {
             
              await Product.update(
                { isActive: false,quilty: 0 },
                { where: { id: item.id } }
              );
            }
          }));
          
           await Cart.update({status:1},{where:{user:userId}})


        return res.status(201).json({
            status: true,
            message: "تم اضافة الطلب بنجاح",
            order: {
              id: order.id,              
              createdAt: moment(order.createdAt).tz('Asia/Aden').format('YYYY-MM-DD HH:mm:ss')
            }
          });
      
    })

  getMyOrderDetils=expressHandler(async(req,res,next)=>{

    const userId=req.user.id;
    const orderId=req.params.id;
    
    
    const order = await Order.findOne({
      where: {
          user: userId,
          id: orderId

         
      },
      include: [
          {
              model: OrderItem, 
              as: 'orderItems',  
              attributes: [ 'quantity', 'price', 'product'],  
              include: [
                  {
                      model: Product,  
                      as: 'productDetails',  
                      attributes: ['name','subName', 'image'],  
                  }
              ]
          }
      ]

  });
if(order.coupon)
  {
    
    const coupon = await Coupon.findOne({where:{id:order.coupon}})
    order.dataValues.coupon=coupon.code;
    
  }
  

  delete order.dataValues.user;
  delete order.dataValues.updatedAt;
  order.dataValues.createdAt=moment(order.dataValues.createdAt).tz('Asia/Aden').format('YYYY-MM-DD HH:mm:ss');

  if(order.location)
    {

    const   location = await Location.findOne({where:{id:order.location}})
    order.dataValues.location=location;
      
    }
  const orderItems = order.orderItems.map((item) => {
    const productDetails = item.productDetails.get(); 
    
    return {
      quantity: item.quantity,
      price: item.price,
      product: item.product,

      ...productDetails,  
      
      image: `${process.env.BASE_URL}/storage/products/${productDetails.image}`
    };
  });

  const modifiedOrder = {
    ...order.get(),  
    orderItems,  
  };

  return res.status(200).json({ status: true, orders: modifiedOrder });
    
  })  

  getMyPreviousOrders=expressHandler(async(req,res,next)=>{
    const userId=req.user.id;

    const order = await Order.findAll({
      where: {
          user: userId,
          [Op.or]: [
            { status: 4 },
            { status: 5 },
            { status: 6 },
        ]
      },
    }
    )

    if(order.length===0)
      {
        return res.status(400).json({status:false,message:"لا يوجد طلبات"});
      }
    const orders=order.map((order)=>
    {
     
      delete order.dataValues.user;
      delete order.dataValues.updatedAt;
      delete order.dataValues.location;
      delete order.dataValues.coupon;
      delete order.dataValues.totalCart;
      delete order.dataValues.deliveryPrice;
      order.dataValues.createdAt=moment(order.createdAt).tz('Asia/Aden').format('YYYY-MM-DD HH:mm:ss')

      


      return order  

    })
    res.status(200).json({ status: true, orders: orders });
  })
  
  getCurrentOrder=expressHandler(async(req,res,next)=>{

    const userId=req.user.id;

    const order = await Order.findAll({
      where: {
          user: userId,
          status: {
            [Op.notIn]: [4, 5, 6]  
        }
      },
    }
    )

    if(order.length===0)
      {
        return res.status(400).json({status:false,message:"لا يوجد طلبات"});
      }
    const orders=order.map((order)=>
    {
     
      delete order.dataValues.user;
      delete order.dataValues.updatedAt;
      delete order.dataValues.location;
      delete order.dataValues.coupon;
      delete order.dataValues.totalCart;
      delete order.dataValues.deliveryPrice;
      order.dataValues.createdAt=moment(order.createdAt).tz('Asia/Aden').format('YYYY-MM-DD HH:mm:ss')

      


      return order  

    })
    res.status(200).json({ status: true, orders: orders });
  })
}
module.exports=OrderController

