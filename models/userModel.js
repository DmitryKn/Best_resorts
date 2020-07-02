const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us tour name'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide tour email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide tour valid email'],
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'A user must have a name'],
        minlength: 6,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
