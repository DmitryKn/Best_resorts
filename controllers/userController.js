const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
            users: users,
        },
    });
});

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route not implemented',
    });
};

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route not implemented',
    });
};

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route not implemented',
    });
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route not implemented',
    });
};
