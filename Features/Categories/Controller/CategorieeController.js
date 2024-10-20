const expressHandler = require('express-async-handler');
const Categoriee = require('../Models/categorieModel');
const sendFailure = require('../../../utils/ResponseHepler/SendFailureResponse');

class CategorieeController
{


    // getAllCatergoriees=expressHandler(async(req,res)=>
    //     {
    //         const categories = await Categoriee.findAll({where:{isActive:true}});

    //         if(categories.length==0)    
    //             {
    //                 return sendFailure(res,400,'لايوجد أقسام');
    //             }
    //         res.status(200).json({status:true,categories});
    //     })
    getAllCatergoriees = expressHandler(async (req, res) => {
        const categories = await Categoriee.findAll({ where: { isActive: true } });
      
        if (categories.length == 0) {
          return sendFailure(res, 400, 'لايوجد أقسام');
        }
      
       
       
      
       
        const updatedCategories = categories.map(category => {
          return {
            ...category.dataValues, 
            image: `${process.env.BASE_URL}/storage/categories/${category.image}` 
          };
        });
      
        res.status(200).json({ status: true, categories: updatedCategories });
      });
      




   


}
module.exports=CategorieeController