
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/register');
const passportsetup = require('../config/passportsetup');
const registerRouter = express.Router();
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

registerRouter.use(express.urlencoded({ extended: true }));

registerRouter.route('/')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (user != null) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'text/plain');
                res.end("User " + req.body.username + " already exists");
            } else {
                User.register(new User({ username: req.body.username }), req.body.password, (err, data) => {
                    if (req.body.email) {
                        data.mail = req.body.email;
                    }
                    data.save((err, updated) => {
                        if (err) {
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({ err: err });
                        } else {
                            passport.authenticate('local')(req, res, () => {
                                res.statusCode = 200;
                                res.redirect('/');
                            });
                        }
                    })

                });
            }
        })
    });

module.exports = registerRouter;