const sendFailureResponse = require('../utils/ResponseHepler/SendFailureResponse');
const globalError=(err,req,res,next)=>
    {
        if (err.name === "JsonWebTokenError") {
           
            return sendFailureResponse(res, 401, "يجب عليك تسجيل الدخول");
        }

        return res.status(err.statusCode || 500).json({
            status: false,
            message: err.message || "An unexpected error occurred",
            statusCode: err.statusCode,
            // stack: err.stack
        });
    }
    module.exports=globalError;