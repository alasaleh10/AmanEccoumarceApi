const expressHandler = require('express-async-handler');
const Banar = require('../Model/banarModel');
class BanarController
{

    addBanar=expressHandler(async(req,res)=>{
        const {image}=req.body;

        if(image)
            {
                res.status(200).json({success:true,image:image})
            }
       
    })

}
module.exports=BanarController