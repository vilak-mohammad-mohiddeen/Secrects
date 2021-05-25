require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
// const encrypt = require('mongoose-encryption');
const passportLocalMangoose = require('passport-local-mongoose');

const register = new mongoose.Schema({

    mail: {
        type: String,
        default: ''
    },
    googleId: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        default: ''
    }
});

// register.plugin(encrypt, { secret: process.env.SECRET_KEY, encryptedFields: ['password'] });

register.plugin(passportLocalMangoose);

const User = mongoose.model('user', register);

module.exports = User;