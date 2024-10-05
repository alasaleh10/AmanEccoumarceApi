const expressHandler = require('express-async-handler');
const moment = require('moment-timezone');
const {sequelize} = require('../../Config/database');
const Order = require('./OrderModel');
const Cart = require('../cart/CartModel');
const User = require('../Auth/Models/UserModel');
const Product = require('../Products/ProductModel');
const Coupon = require('../Coupons/CouponModel');
const OrderItems = require('./OrderItemsModel');
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
            }

           await Promise.all(data.items.map(async (item) => {


            await OrderItems.create({ order: order.id, user: userId ,product:item.id,price:item.price,quantity:item.quantity});
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

}
module.exports=OrderController
