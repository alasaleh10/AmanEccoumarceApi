const expressHandler = require('express-async-handler');
const Coupon = require('../../Features/Coupons/CouponModel');
const { Op,Sequelize } = require('sequelize');
class AdminCouponsController
{
    addCoupon=expressHandler(async(req,res,next)=>{
        const {code,discount,expire,count}=req.body;
        await Coupon.create({code,discount,expire,count});
        res.status(201).json({status:true,message:"تم اضافة الكوبون بنجاح"});
    })

    getCoupons=expressHandler(async(req,res,next)=>{
        const coupons=await Coupon.findAll({
            order: Sequelize.literal('DBMS_RANDOM.VALUE')
        });

        if(coupons.length==0)
            {
                return res.status(400).json({status:false,message:"لايوجد كوبونات"})
            }
      return  res.status(200).json({status:true,coupons});
    })

    getCouponDetils=expressHandler(async(req,res,next)=>{
        if(!req.params.id) return res.status(400).json({status:false,message:"يجب عليك ادخال الكوبون"})
        const {id}=req.params;
        const coupon=await Coupon.findOne({where:{id}});
        if(!coupon)
            {
                return res.status(400).json({status:false,message:"هذا الكوبون غير موجود"})
            }
        return  res.status(200).json({status:true,coupon});
    })
    serachCoupons=expressHandler(async(req,res,next)=>{
        if(!req.body.code) return res.status(400).json({status:false,message:"يجب عليك ادخال الكوبون"})
        const {code}=req.body;
    
    
        const coupons = await Coupon.findAll({
            where: {
                code: { [Op.like]: `%${code}%` }
            }
        });
        if(coupons.length==0)
            {
                return res.status(400).json({status:false,message:"لايوجد كوبونات"})
            }
        return  res.status(200).json({status:true,coupons});
    })

    editCoupone=expressHandler(async(req,res,next)=>{
        if(!req.params.id) return res.status(400).json({status:false,message:"يجب عليك ادخال الكوبون"})
        const {id}=req.params; 
        const coupon=await Coupon.findOne({where:{id}});
        if(!coupon)
            {
                return res.status(400).json({status:false,message:"هذا الكوبون غير موجود"})
            }
       const data=req.body;
       if('code' in data)
        {
            const oldCoupon = await Coupon.findOne({
                where: {
                  code: data.code,
                  id: {
                    [Op.ne]: req.params.id 
                  }
                }
              });
            if(oldCoupon)
                {
                    return res.status(400).json({status:false,message:"هذا الكوبون موجود بالفعل"})
                }

        }
       
       await coupon.update({...data});
       return res.status(200).json({status:true,message:"تم تعديل الكوبون بنجاح"})
    })

}
module.exports=AdminCouponsController