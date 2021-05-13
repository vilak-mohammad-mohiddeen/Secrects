
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/register');
const registerRouter = express.Router();
// const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;
registerRouter.use(express.urlencoded({ extended: true }));

registerRouter.route('/')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            const newuser = new User({
                name: req.body.username,
                mail: req.body.email,
                password: hash
            });
            newuser.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('secrets');
                }
            });
        });

    });

module.exports = registerRouter;