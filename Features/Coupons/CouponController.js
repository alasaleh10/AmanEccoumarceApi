const expressHandler = require('express-async-handler');
const moment = require('moment-timezone');
const Coupon = require('./CouponModel');
class CouponController
{
    addCoupon=expressHandler(async(req,res)=>{
        const data=req.body;
        await Coupon.create(data);
        res.status(201).json({status:true,message:"تم اضافة الكوبون بنجاح"});
    });

   
    cheekCoupon=expressHandler(async(req,res)=>{
        const {code}=req.query;
        const coupon=await Coupon.findOne({where:{code}});
        if(!coupon.isActive)
            {
             return res.status(400).json({status:false,message:"هذا الكوبون غير مفعل"});
            }
            const todayInYemen = moment.tz('Asia/Aden').startOf('day')
            
            if(moment(coupon.expire).isBefore(todayInYemen)|| coupon.count==0)
                {
              return res.status(400).json({status:false,message:"هذا الكوبون منتهي"});

           }
           delete coupon.dataValues.expire;
           delete coupon.dataValues.isActive;
           delete coupon.dataValues.count;
           return res.status(200).json({status:true,coupon});

    })

  

}
module.exports=CouponController