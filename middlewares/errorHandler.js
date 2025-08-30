import {errorResponces} from "../utils/errorResponces.js";

const errorHandler =(err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const errorResponce = errorResponces[statusCode] || errorResponces[500];

    res.status(statusCode).json(errorResponce(err.message))
}

export default  errorHandler