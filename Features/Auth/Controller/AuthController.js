const jwt = require('jsonwebtoken');
const expressHandler = require('express-async-handler');
const crypto = require('crypto');
const User=require('../Models/UserModel');
const seandFailreResponse = require('../../../utils/ResponseHepler/SendFailureResponse');



class AuthController
{


    signUp=expressHandler(async(req,res,next)=>
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

    virifyCode=expressHandler(async(req,res,next)=>
        {
            const {email,virifyCode}=req.body;

            const hashedResetCode = crypto
    .createHash('sha256')
    .update(virifyCode)
    .digest('hex');
            const user=await User.findOne({where:{email:email}});

            
            if(user.virifyCode===hashedResetCode)
                {
                    if(user.expireCodeDate>Date.now())
                        {
                            let code = Math.floor(10000 + Math.random() * 90000).toString();
                            const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
                         await User.update({virifyCode:hashedCode,isApproved:true},{where:{email:email}});
                             const token=jwt.sign({id:user.id},process.env.JWT_SECRET_KEY);
                             if (user.image) {
                                user.image = `${process.env.BASE_URL}/storage/users/${user.image}`;
                            }
                            user.password=undefined;
                            user.virifyCode=undefined;
                            user.expireCodeDate=undefined;

                            return res.status(200).json({
                                success:true,
                                message:'تم التحقق بنجاح',
                                user,
                                token
                            });
                        }
                        else
                        {
                            return seandFailreResponse(res,400,'انتهت صلاحية الكود')
                        }
                }
                else
                {
                    return seandFailreResponse(res,400,'كود التحقق غير صحيح')
                }
        }
);
   






}

module.exports=AuthController;