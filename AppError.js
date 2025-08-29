export class AppError extends Error {
    constructor(message, statusCode){
        super(message); // call parent error message
        this.statusCode = statusCode;
        this.status = '${statusCode}'.startsWith('4') ? "Fail" : "Error"
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor) // capture error happen place and exclude the constructor it self
    }
}

