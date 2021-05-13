const express = require('express');
const User = require('../models/register');
const loginRouter = express.Router();
// const md5 = require('md5');
const bcrypt = require('bcrypt');
loginRouter.use(express.urlencoded({ extended: true }));
loginRouter.route('/')
    .get((req, res) => {
        res.render("login");
    })
    .post((req, res) => {
        User.findOne({ mail: req.body.email }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (data) {
                    bcrypt.compare(req.body.password, data.password, (err, result) => {
                        if (err) {
                            console.log("Wrong password");
                        } else {
                            res.render('secrets');
                        }
                    });
                }
            }
        })
    });

module.exports = loginRouter;