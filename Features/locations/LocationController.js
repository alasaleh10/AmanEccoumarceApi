const expressHandler = require('express-async-handler');
const Location = require('./LocationModel');
const sendFailure = require('../../utils/ResponseHepler/SendFailureResponse');
class LocationController
{
    addLocation=expressHandler(async(req,res)=>{
        
        const data=req.body;
       
        const location=await Location.create({...data,user:req.user.id});

        res.status(201).json({status:true,message:"تم اضافة الموقع بنجاح",location:location});


    });

    getMyLocations=expressHandler(async(req,res)=>{

        const location = await Location.findAll({
            where: {
              user: req.user.id
            },
            order: [['isMain', 'DESC'], ['id', 'ASC']] // ترتيب حسب isMain ثم id
          });
          
        if(location.length==0) 
            {
                return sendFailure(res,400,'لايوجد مواقع');
            }
        res.status(200).json({status:true,location});
      


    });

    getSpicificLocation=expressHandler(async(req,res)=>{
        const id=req.params.id;
        const location=await Location.findOne({where:{id:id,user:req.user.id}});
        if(!location)
            {
                return sendFailure(res,400,'لايوجد موقع');
            }
        res.status(200).json({status:true,location});

    });
    deleteLocation=expressHandler(async(req,res)=>{

        const id=req.params.id;
        const location=await Location.destroy({where:{id:id,user:req.user.id}});

        if(!location)
            {
                return sendFailure(res,400,'لايوجد موقع');
            }
        
        res.status(200).json({status:true,message:"تم حذف الموقع بنجاح"});


    });
}
module.exports=LocationController;