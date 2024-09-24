const expressHandler = require('express-async-handler');
const Problem = require('./models/ProblemModel');
const FaqQuestion = require('./models/FaqQuestionsModel');
class problemController
{
    addProblem=expressHandler(async(req,res,next)=>{
       
        const userId = req.user ? req.user.id : null; 
        await Problem.create({ ...req.body, user: userId });
        return res.status(201).json({ status: true, message: `تم اضافة ${req.body.type} بنجاح`});
     });

     getFaqQusetions=expressHandler(async(req,res,next)=>{
   
            const  page= req.query.page*1 ||1; 
            const limit=25;
            const skip=(page-1)*limit;


        const faqQusetions = await FaqQuestion.findAll(
            {
                offset: skip,
                limit: limit
            }
            
            
        );
        return res.status(200).json({ status: true,questions: faqQusetions});
     })

}
module.exports=problemController;