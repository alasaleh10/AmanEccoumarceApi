const expressHandler = require('express-async-handler');
const moment = require('moment-timezone');
const { Op } = require('sequelize');
const Order = require('../../Features/orders/OrderModel');
const User = require('../../Features/Auth/Models/UserModel');
const OrderItem = require('../../Features/orders/OrderItemsModel');
const Product = require('../../Features/Products/ProductModel');
const Coupon = require('../../Features/Coupons/CouponModel');
const Location = require('../../Features/locations/LocationModel');
class AdminOrdersController {


    searchOrders = expressHandler(async (req, res, next) => {
    
        if(!req.query.order && !req.query.name){
            return res.status(400).json({status:false,message:"يجب عليك ادخال الطلبية أوالاسم"});
        }

        if(req.query.order){

            const orders = await Order.findAll({
                where: { id: req.query.order },
                include: [{
                  model: User,
                  as: 'userData',  
                  attributes: ['firstName','lastName','image']
                }]
              });
              if(orders.length==0) return res.status(400).json({status:false,message:"لايوجد طلبيات"});
           
           
              orders.forEach(order => {
                order.dataValues.createdAt=moment(order.dataValues.createdAt).tz('Asia/Riyadh').format('YYYY-MM-DD HH:mm:ss');
                order.dataValues.firstName = order.userData.firstName;
                order.dataValues.lastName = order.userData.lastName;
                order.dataValues.image=`${process.env.BASE_URL}/storage/users/${order.userData.image}`;
                
                delete order.dataValues.user;
                delete order.dataValues.coupon;
                delete order.dataValues.location;
                
                delete order.dataValues.updatedAt;
                delete order.dataValues.userData; 
                return order;
              })
              return res.status(200).json({status:true,orders:orders});
                 }

        if(req.query.name){
            const name=req.query.name;
            const orders = await Order.findAll({
                include: [{
                  model: User,
                  as: 'userData',
                  attributes: ['firstName', 'lastName', 'image'],
                  where: {
                    [Op.or]: [
                      { firstName: { [Op.like]: `%${name[0]}%` } },
                      { lastName: { [Op.like]: `%${name[0]}%` } },
                     
                      ...(name.length > 1 ? [
                        { firstName: { [Op.like]: `%${name[1]}%` } },
                        { lastName: { [Op.like]: `%${name[1]}%` } }
                      ] : [])
                    ]
                  }
                }]
              });
              if(orders.length==0) return res.status(400).json({status:false,message:"لايوجد طلبيات"});
           
           
              orders.forEach(order => {
                order.dataValues.createdAt=moment(order.dataValues.createdAt).tz('Asia/Riyadh').format('YYYY-MM-DD HH:mm:ss');
                order.dataValues.firstName = order.userData.firstName;
                order.dataValues.lastName = order.userData.lastName;
                order.dataValues.image=`${process.env.BASE_URL}/storage/users/${order.userData.image}`;
                
                delete order.dataValues.user;
                delete order.dataValues.coupon;
                delete order.dataValues.location;
                
                delete order.dataValues.updatedAt;
                delete order.dataValues.userData; 
                return order;
              })
              return res.status(200).json({status:true,orders:orders});
        }
        


    })

    getOrderDetils=expressHandler(async(req,res,next)=>{
        if(!req.params.order) return res.status(400).json({status:false,message:'يجب عليك ادخال رقم الطلبية'})
            const orderID=req.params.order;
        const order = await Order.findOne({
            where: { id: orderID },
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
      if(!order)
        {
          return res.status(404).json({status:false,message:"الطلب غير موجود"})
        }
      
      if(order.coupon)
        {
          
          const coupon = await Coupon.findOne({where:{id:order.coupon}})
          order.dataValues.coupon=coupon.code;
          
        }
        
      
        delete order.dataValues.user;
        delete order.dataValues.updatedAt;
        order.dataValues.createdAt=moment(order.dataValues.createdAt).tz('Asia/Riyadh').format('YYYY-MM-DD HH:mm:ss');
      
        if(order.location)
          {
      
          const   location = await Location.findOne({where:{id:order.location}})
          order.dataValues.location=location;
          delete order.dataValues.location.dataValues.updatedAt;
          delete order.dataValues.location.dataValues.createdAt;
          delete order.dataValues.location.dataValues.user;
            
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
      
        return res.status(200).json({ status: true, order: modifiedOrder });
          
        }) 
}

module.exports = AdminOrdersController