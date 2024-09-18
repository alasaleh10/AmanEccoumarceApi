const { check } = require('express-validator');
const validationMiddleware = require('../../../Middleware/validatiorMiddelware');


addCategrorieeValidation = [   
    check('name').notEmpty().withMessage('اسم القسم مطلوب'),


    validationMiddleware

 ];
module.exports = addCategrorieeValidation