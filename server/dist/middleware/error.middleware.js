"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (err, req, res, next) => {
    let error = err;
    // Check if the error is an instance of an ApiError class which extends native Error class
    if (!(error instanceof ApiError_1.ApiError)) {
        // if not
        // create a new ApiError instance to keep the consistency
        // assign an appropriate status code
        const statusCode = 500;
        // set a message from native Error instance or a custom one
        const message = error.message || "Something went wrong";
        error = new ApiError_1.ApiError(statusCode, message);
    }
    // Now we are sure that the `error` variable will be an instance of ApiError class
    const response = Object.assign(Object.assign(Object.assign({}, error), { message: error.message }), (process.env.NODE_ENV === "development" ? { stack: error.stack } : {}));
    return res.status(error.statusCode).json(response);
};
exports.errorHandler = errorHandler;
