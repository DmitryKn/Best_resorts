const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        validate: {
            //this only works on .CREATE() and .SAVE(); not .update()
            validator: function (elem) {
                return elem === this.password;
            },
            message: 'Passwords are not the same!',
        },
    },
});

userSchema.pre('save', async function (next) {
    //Runs this func if password was modified
    if (!this.isModified('password')) return next();

    //Hash Password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
