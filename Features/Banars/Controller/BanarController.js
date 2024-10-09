const expressHandler = require('express-async-handler');
const Banar = require('../Model/banarModel');
const resizedImage = require('../../../helpers/resizedImage');
class BanarController
{

    addBanar=expressHandler(async(req,res)=>{

        const filename = await resizedImage(req, 'banars',100,1000,500);
        
        const banar=await Banar.create({image:filename});

        res.status(201).json({status:true,banar})
        

      
       
    })

}
module.exports=BanarController