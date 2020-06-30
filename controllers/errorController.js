const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path} : ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsErrorDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate field value: ${value}.  Please use another value!`;
    return new AppError(message, 400);
}

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}
const sendErrorDevelopment = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProduction = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error('ERROR', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDevelopment(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };

        // get wrong id error
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        //duplicate db fields error
        if(error.code === 11000) error = handleDuplicateFieldsErrorDB(error);
        //mongoose validation errors(wrong updates)
        if(error.name ==='ValidationError') error = handleValidationError(error)

        sendErrorProduction(error, res);
    }
};
