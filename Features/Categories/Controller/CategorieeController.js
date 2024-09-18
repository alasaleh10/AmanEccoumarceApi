const expressHandler = require('express-async-handler');
const Categoriee = require('../Models/categorieModel');
const sendFailure = require('../../../utils/ResponseHepler/SendFailureResponse');
const resizedImage = require('../../../helpers/resizedImage');
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
      




    addCategoriee=expressHandler(async(req,res)=>

        {
          const oldCategorie=await Categoriee.findOne({where:{name:req.body.name}});
          if(oldCategorie)
            {
                return sendFailure(res,400,'هذا القسم موجود بالفعل');
            }

        
          
          
          
            const filename = await resizedImage(req, 'categories',95,1000,1000);   
            const categorie = await Categoriee.create({
                name: req.body.name,
                image: filename
              });

              if(categorie.image)
                {
                    categorie.image=`${process.env.BASE_URL}/storage/categories/${filename}`;
                }
           

            res.status(201).json({status:true,message:"تم اضافة القسم بنجاح",categoriee:categorie});
         

        })


}
module.exports=CategorieeController