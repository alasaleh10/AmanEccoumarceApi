const expressHandler = require('express-async-handler');
const Categoriee = require('../Models/categorieModel');
const sendFailure = require('../../../utils/ResponseHepler/SendFailureResponse');

class CategorieeController
{

    getAllCatergoriees = expressHandler(async (req, res) => {
        const categories = await Categoriee.findAll({ where: { isActive: true } });  
        if (categories.length == 0) {
          return sendFailure(res, 400, 'لايوجد أقسام');
        }
        categories.map((category) => {
        delete  category.dataValues.createdAt;
        delete  category.dataValues.updatedAt;
        return category;  
        });
 
        res.status(200).json({ status: true, categories: categories });
      });
  
}
module.exports=CategorieeController