const expressHandler = require('express-async-handler');
const User = require('../../Features/Auth/Models/UserModel');
class AdminUsersController
{

    getAllUsers=expressHandler(async(req,res,next)=>{
        const users=await User.findAll();
        users.map(user=>{
           delete user.dataValues.password;
           delete user.dataValues.updatedAt;
           delete user.dataValues.createdAt;
           delete user.dataValues.passwordUpdatedAt;
           delete user.dataValues.virifyCode;
           delete user.dataValues.expireCodeDate;
           user.dataValues.image=`${process.env.BASE_URL}/storage/users/${user.dataValues.image}`

            return user
        })
        return res.status(200).json({status:true,users:users})
        
    })

  editCriditAndPoint=expressHandler(async(req,res,next)=>{

    const {id}=req.params

    if(!req.body.credit && !req.body.points)
        {
            return res.status(400).json({status:false,message:"يجب عليك تعديل أحد الحقول"})
        }
        
        const user=await User.findOne({where:{id:id}});
        var newCridit=user.credit;
        var newPoint=user.points;
        if(req.body.credit)
            {
                newCridit+=req.body.credit
            }
            if(req.body.points)
                {
                    newPoint+=req.body.points
                }
    
     
       await user.update({credit:newCridit,points:newPoint},{where:{id:id}});

   
        return res.status(200).json({status:true,message:"تم تعديل البيانات بنجاح"})
        
  })  

}
module.exports=AdminUsersController