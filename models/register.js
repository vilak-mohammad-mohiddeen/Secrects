require('dotenv').config();
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const register = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

register.plugin(encrypt, { secret: process.env.SECRET_KEY, encryptedFields: ['password'] });

const User = mongoose.model('user', register);
module.exports = User;