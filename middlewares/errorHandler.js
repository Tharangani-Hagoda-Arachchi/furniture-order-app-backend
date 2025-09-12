import {errorResponces} from "../utils/errorResponces.js";

const errorHandler =(err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const errorResponceBuilder = errorResponces[statusCode] || errorResponces[500];

    res.status(statusCode).json(errorResponceBuilder(err.message))
}

export default  errorHandler