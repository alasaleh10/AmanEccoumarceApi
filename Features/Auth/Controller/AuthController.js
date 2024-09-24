// const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const expressHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User=require('../Models/UserModel');
const generatedCode = require('../../../utils/generadt_code');
const sendEmail = require('../../../helpers/sendEmail');
const {welcomAgainMessage} = require('../../../helpers/emailMessages');
const ApiError = require('../../../utils/ApiError');
const myTime = require('../../../helpers/myTime');
const add5MinTime=moment().tz('Asia/Aden').add(5, 'minutes').format('yyyy-MM-DD HH:mm:ss');
class AuthController
{

  cheekToken=expressHandler(async(req,res,next)=>
    {
      let token;
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
          token=req.headers.authorization.split(' ')[1];
        }

      if(!token)
        {
          return next(new ApiError(401,'خطا في تسجيل الدخول, يرجى تسجيل الدخول مرة أخرى'));
        }

      const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

      const user=await User.findOne({where:{id:decoded.id}});
      if(!user)
        {
          return next(new ApiError(401,'لايوجد حساب لديك قم بتسجيل حساب'));
        }
        if (user.passwordUpdatedAt) {
          const issuedAt = moment.unix(decoded.iat).format('YYYY-MM-DD HH:mm:ss');
        
       
          const issuedAtMoment = moment(issuedAt, 'YYYY-MM-DD HH:mm:ss');
          const passwordUpdatedAtMoment = moment(user.passwordUpdatedAt, 'YYYY-MM-DD HH:mm:ss');
        
         
          if (issuedAtMoment.isBefore(passwordUpdatedAtMoment)) {
            return next(new ApiError(401, 'انتهت صلاحية كلمة المرور الخاصة بك'));
          }
        }
        

      req.user=user;
      next();
    });

    cheekisAdmin=expressHandler(async(req,res,next)=>{

      if(!req.user.isAdmin==true)
        {
          return  res.status(401).json({success:false,message:"غير مسموح لك بالدخول"})
        }
        next();


    })
    optinalToken=expressHandler(async(req,res,next)=>{
      let token;
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
          token=req.headers.authorization.split(' ')[1];
        }

      if(!token)
        {
       return   next();
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

      const user=await User.findOne({where:{id:decoded.id}});
      if(!user)
        {
          return next(new ApiError(401,'لايوجد حساب لديك قم بتسجيل حساب'));
        }
        if (user.passwordUpdatedAt) {
          const issuedAt = moment.unix(decoded.iat).format('YYYY-MM-DD HH:mm:ss');
        
       
          const issuedAtMoment = moment(issuedAt, 'YYYY-MM-DD HH:mm:ss');
          const passwordUpdatedAtMoment = moment(user.passwordUpdatedAt, 'YYYY-MM-DD HH:mm:ss');
        
         
          if (issuedAtMoment.isBefore(passwordUpdatedAtMoment)) {
            return next(new ApiError(401, 'انتهت صلاحية كلمة المرور الخاصة بك'));
          }
        }
        

      req.user=user;
      next();




    });


forgetPassword=expressHandler(async(req,res)=>{
    const code=generatedCode();
    console.log(code);
    
    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
    const {email}=req.body;
 await User.update({virifyCode:hashedCode,expireCodeDate:add5MinTime},{where:{email:email}});

   return res.status(200).json({success:true,message:"تم ارسال كود التحقق بنجاح"});

});

sendCode=expressHandler(async(req,res)=>
   {
      let code = Math.floor(10000 + Math.random() * 90000).toString();
      const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
            
    const {email}=req.body;
  
    

    const user=await User.findOne({where:{email:email}});          
    try {  
     await sendEmail(
            user.email,
            welcomAgainMessage(code, user.firstName)
           ,
            "كود التحقق لحسابك في متجر أمان"
        );

        await User.update({virifyCode:hashedCode,expireCodeDate:add5MinTime},{where:{email:email}});
       return res.status(200).json({success:true,message:"تم ارسال كود التحقق بنجاح"});
      } catch (error) {
        throw new ApiError(400,'فشل إرسال البريد الإلكتروني');
        
     
    }


   });

restPassword=expressHandler(async(req,res)=>{
    

    const {email,password}=req.body;
  
    const hashedPassword=await bcrypt.hash(password,10);

    await User.update({password:hashedPassword,passwordUpdatedAt:myTime},{where:{email:email}});

    return res.status(200).json({success:true,message:"تم تغيير كلمة المرور بنجاح"});


   });

 editMyAccount=expressHandler(async(req,res)=>{
    const id=req.user.id;
    const body=req.body;
    await User.update(body,{where:{id:id}});
    return res.status(200).json({status:true,message:"تم تعديل حسابك بنجاح"});




})
}
module.exports=AuthController;