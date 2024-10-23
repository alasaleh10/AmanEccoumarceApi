
const fs = require('fs');
const expressHandler = require('express-async-handler');
const { Op,Sequelize } = require('sequelize');
const Categoriee = require('../../Features/Categories/Models/categorieModel');
const resizedImage = require('../../helpers/resizedImage');
class AdminCategorieeController
{
    getAllCategories = expressHandler(async (req, res, next) => {
        const categories = await Categoriee.findAll({
          order: Sequelize.literal('DBMS_RANDOM.VALUE') 
        });
      
        if (categories.length == 0) {
          return res.status(400).json({ status: false, message: 'لايوجد قسم' });
        }
      
        return res.status(200).json({ status: true, categories: categories });
      });
      
    serarchCategories=expressHandler(async(req,res,next)=>{
        if(!req.query.name) return res.status(400).json({status:false,message:'يجب عليك ادخال القسم'}) 
        const {name}=req.query
        const categories = await Categoriee.findAll({where:{name:{[Op.like]:`%${name}%`}}});
        if(categories.length==0) return res.status(400).json({status:false,message:'لايوجد قسم'})
        return res.status(200).json({status:true,categories:categories})    
    });

    addCategoriee=expressHandler(async(req,res)=>

        {
          const oldCategorie=await Categoriee.findOne({where:{name:req.body.name}});
          if(oldCategorie)
            {
                return res.status(400).json({status:false,message:"هذا القسم موجود بالفعل"})
            }
    
            const filename = await resizedImage(req, 'categories',95,1000,1000);   
           await Categoriee.create({
                name: req.body.name,
                image: filename
              });
            res.status(201).json({status:true,message:"تم اضافة القسم بنجاح"});
         

        })

    getSpicificCategoriee=expressHandler(async(req,res,next)=>{
         const id=req.params.id
         if(!id) return res.status(400).json({status:false,message:'يجب عليك ادخال القسم'})
         const category=await Categoriee.findOne({where:{id:id}});
         if(!category) return res.status(400).json({status:false,message:'هذا القسم غير موجود'})
         return res.status(200).json(category)
     })   

 editCategoriee=expressHandler(async(req,res,next)=>{
  const id=req.params.id;
  const data=req.body;
   if(!id) return res.status(400).json({status:false,message:'يجب عليك ادخال القسم'})

    const category=await Categoriee.findOne({where:{id:id}});

    if(!category) return res.status(400).json({status:false,message:'هذا القسم غير موجود'})

      if(req.file)
        {            
            const filename = await resizedImage(req, 'categories',95,1000,1000);
            const imageName = category.image.split('categories/')[1];
            fs.unlinkSync(`storage/categories/${imageName}`);
            data.image=filename
        }
        await Categoriee.update({...data},{where:{id:id}});

        res.status(200).json({status:true,message:"تم تعديل القسم بنجاح"});
    }) 
}
module.exports=AdminCategorieeController