const express = require('express');
const User = require('../models/register');
const loginRouter = express.Router();
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
                    if (data.password === req.body.password) {
                        res.render("secrets");
                    } else {
                        console.log("Unauthenticated User");
                    }
                }
            }
        })
    });

module.exports = loginRouter;