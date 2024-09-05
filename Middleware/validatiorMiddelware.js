const { validationResult } = require('express-validator');
const sendFailureResponse = require('../utils/ResponseHepler/SendFailureResponse');


const validatorMiddelware = (req, res, next) => {
    // upload.none();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return   sendFailureResponse(res, 400, errors.array()[0].msg);
     
    }
    next();
};
module.exports = validatorMiddelware;
