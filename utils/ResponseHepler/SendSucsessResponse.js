const sendSucessResponse = (res, code = 200, message = "success", data) => {
    return res.status(code).json({
        status: true,
        data: data,
        message: message
    });
}
module.exports=sendSucessResponse;