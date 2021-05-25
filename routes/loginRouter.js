const express = require('express');
const User = require('../models/register');
const loginRouter = express.Router();
// const md5 = require('md5');
const bcrypt = require('bcrypt');
const passportsetup = require('../config/passportsetup');
const passport = require('passport');
loginRouter.use(express.urlencoded({ extended: true }));
loginRouter.route('/')
    .get((req, res) => {
        res.render("login");
    })
    .post(passport.authenticate('local'), (req, res) => {

        res.statusCode = 200;
        res.redirect('/secret');
    });

module.exports = loginRouter;