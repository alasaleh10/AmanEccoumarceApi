const expressHandler = require('express-async-handler');
const Rating = require('./RatingModel');
class RatingController
{

    addRating=expressHandler(async(req,res)=>{

        const userId=req.user.id;
        const orderID=req.body.order;

        const rating=await Rating.findOne({where:{user:userId,order:orderID}});
        if(rating)
            {
            await Rating.update({rating:req.body.rating,feadback:req.body.feadback,comment:req.body.comment},{where:{user:userId,order:orderID}})
            res.status(200).json({status:true,message:"تم اضافة التقييم بنجاح"});
            }
            else
            {

            await Rating.create({rating:req.body.rating,feadback:req.body.feadback,comment:req.body.comment,user:req.user.id,order:req.body.order})
            res.status(201).json({status:true,message:"تم اضافة التقييم بنجاح"});
            }


    })



}
module.exports=RatingController