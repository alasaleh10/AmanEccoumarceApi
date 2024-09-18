class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);  
        this.statusCode = statusCode;
        this.message = message;
        this.status = false;  
    }
}

module.exports = ApiError;
