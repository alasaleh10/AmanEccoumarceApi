const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const { Op } = require('sequelize');
const expressHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User=require('../Models/UserModel');
const seandFailreResponse = require('../../../utils/ResponseHepler/SendFailureResponse');
const Order = require('../../orders/OrderModel');





class UserController
{


    signUp=expressHandler(async(req,res)=>
    {
        
        
       const {firstName,lastName,email,phone,password}=req.body;
        const user = await User.create({firstName,lastName,email,phone,password});
     const data={
        id:user.id,
        email:user.email
        
     };
        return res.status(201).json({
            success:true,
            message:'تم تسجيل المستخدم بنجاح',
            data      
        }); 
    })

     virifyCode = expressHandler(async (req, res) => {
     
       
    
        const { email, virifyCode } = req.body;
    
        const hashedResetCode = crypto
            .createHash('sha256')
            .update(virifyCode)
            .digest('hex');
    
        const user = await User.findOne({ where: { email: email } });
    
        if (user.virifyCode === hashedResetCode) {
          
            if (moment(user.expireCodeDate).isAfter(moment().tz('Asia/Riyadh'))) {
                let code = Math.floor(10000 + Math.random() * 90000).toString();
                const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
    
                await User.update(
                    { virifyCode: hashedCode, isApproved: true, passwordUpdatedAt: moment().tz('Asia/Riyadh').format() },
                    { where: { email: email } }
                );    
                const token = jwt.sign({ id: user.id, iat: moment().tz('Asia/Riyadh').unix() }, process.env.JWT_SECRET_KEY);
               
                user.password = undefined;
                user.virifyCode = undefined;
                user.expireCodeDate = undefined;
    
                return res.status(200).json({
                    success: true,
                    message: 'تم التحقق بنجاح',
                    user,
                    token
                });
            } else {
                return seandFailreResponse(res, 400, 'انتهت صلاحية الكود');
            }
        } else {
            return seandFailreResponse(res, 400, 'كود التحقق غير صحيح');
        }
    });
    

     login=expressHandler(async(req,res)=>
    {
        const {phone,password}=req.body;
        const user=await User.findOne({where:{phone:phone}});
        if(!user)
            {
                return seandFailreResponse(res, 400, 'المستخدم غير موجود');
            }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return seandFailreResponse(res, 400, 'كلمة المرور غير صحيحة');
        }
        user.password=undefined;
        user.virifyCode=undefined;
        user.expireCodeDate=undefined;
        user.passwordUpdatedAt=undefined;
        delete user.dataValues.createdAt;
        delete user.dataValues.updatedAt;
        if(!user.isApproved)
            {
                let code = Math.floor(10000 + Math.random() * 90000).toString();
               
                console.log(code);
                
      const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
      await User.update({virifyCode:hashedCode,expireCodeDate:moment().tz('Asia/Aden').
        add(5, 'minutes').format()},{where:{phone:phone}});
      
      
                return res.status(200).json({success:true,message:"تم ارسال كود التحقق بنجاح",user});
            }
            else
            {
 
               
                const token = jwt.sign({ id: user.id, iat: moment().tz('Asia/Riyadh').unix() }, process.env.JWT_SECRET_KEY);
                
                return res.status(200).json({
                    success:true,
                    message:'تم تسجيل الدخول بنجاح',
                    user,
                    token
                });
            }

  

    }
  
    );

    getAccount=expressHandler(async(req,res)=>
        {
            const user=req.user;
          
            user.password=undefined;
            user.virifyCode=undefined;
            user.expireCodeDate=undefined;
            user.passwordUpdatedAt=undefined;
            const order=await Order.count({where:{user:user.id, status: {
                [Op.notIn]: [4, 5, 6]  
            }}})
            return res.status(200).json({
                success:true,
                user,
                order
            })
        })


        
}

module.exports=UserController;