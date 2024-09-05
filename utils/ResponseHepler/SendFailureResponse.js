
sendFailureResponse=(res,code= 400,message="An unexpected error occurred")=>
    {
       res.status(code).json({
            status: false,
            message: message,
            statusCode:code
           
        });
     }
module.exports=sendFailureResponse;