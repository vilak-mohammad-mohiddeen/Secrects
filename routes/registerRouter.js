
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/register');
const registerRouter = express.Router();
registerRouter.use(express.urlencoded({ extended: true }));

registerRouter.route('/')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        const newuser = new User({
            name: req.body.username,
            mail: req.body.email,
            password: req.body.password
        });
        newuser.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.render('secrets');
            }
        });
    });

module.exports = registerRouter;