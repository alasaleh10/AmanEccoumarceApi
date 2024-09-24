const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const expressHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User=require('../Models/UserModel');
const seandFailreResponse = require('../../../utils/ResponseHepler/SendFailureResponse');
const date = require('../../../helpers/myTime');


const now = moment().tz('Asia/Aden');



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

    virifyCode=expressHandler(async(req,res)=>


        {
            
           
            
            const {email,virifyCode}=req.body;

            const hashedResetCode = crypto
    .createHash('sha256')
    .update(virifyCode)
    .digest('hex');
            const user=await User.findOne({where:{email:email}});
           

            
            if(user.virifyCode===hashedResetCode)
                {
                    if(user.expireCodeDate>date)
                        {
                            let code = Math.floor(10000 + Math.random() * 90000).toString();
                            const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

                   const user2=    await User.update({virifyCode:hashedCode,isApproved:true,passwordUpdatedAt:date}

                       ,{where:{email:email}});

                       const userdate=new Date(user2.passwordUpdatedAt);
                             const token=jwt.sign({id:user.id,

                                iat:Math.floor(userdate.getTime() / 1000)
                             }
                                ,process.env.JWT_SECRET_KEY
                            );
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

     login=expressHandler(async(req,res)=>
    {
        const {phone,password}=req.body;
        const user=await User.findOne({where:{phone:phone}});
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return seandFailreResponse(res, 400, 'كلمة المرور غير صحيحة');
        }

        if(!user.isApproved)
            {
                let code = Math.floor(10000 + Math.random() * 90000).toString();
                console.log(code);
                
      const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
      await User.update({virifyCode:hashedCode,expireCodeDate:moment().tz('Asia/Aden').
        add(5, 'minutes').format('yyyy-MM-DD HH:mm:ss')},{where:{phone:phone}});
      user.password=undefined;
      user.virifyCode=undefined;
      user.expireCodeDate=undefined;
      user.passwordUpdatedAt=undefined;
                return res.status(200).json({success:true,message:"تم ارسال كود التحقق بنجاح",user});
            }
            else
            {
                const userdate=new Date(user.passwordUpdatedAt);
                
                if (user.image) {
                    user.image = `${process.env.BASE_URL}/storage/users/${user.image}`;
                }
                const token=jwt.sign({id:user.id,
                    iat:Math.floor(userdate.getTime() / 1000)} ,process.env.JWT_SECRET_KEY );
                user.password=undefined;
                user.virifyCode=undefined;
                user.expireCodeDate=undefined;
                user.passwordUpdatedAt=undefined;
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
            if (user.image) {
                user.image = `${process.env.BASE_URL}/storage/users/${user.image}`;
            }
            user.password=undefined;
            user.virifyCode=undefined;
            user.expireCodeDate=undefined;
            user.passwordUpdatedAt=undefined;
            return res.status(200).json({
                success:true,
                user
            })
        })


        
}

module.exports=UserController;