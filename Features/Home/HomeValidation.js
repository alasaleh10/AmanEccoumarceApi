const { query } = require('express-validator');
const validationMiddleware = require('../../Middleware/validatiorMiddelware');



searchValidation=[
    query('search').notEmpty().withMessage('يجب ادخال كلمة البحث'),

    validationMiddleware
]




module.exports={
    searchValidation
}