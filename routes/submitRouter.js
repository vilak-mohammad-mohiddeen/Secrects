const express = require('express');
const User = require('../models/register');
const submitRouter = express.Router();
submitRouter.use(express.urlencoded({ extended: true }));

submitRouter.route('/').get((req, res) => {
    if (req.isAuthenticated()) {
        User.find({ secret: { $ne: null } }, (err, foundUsers) => {
            if (err) {
                res.end("Error in Loading");
            } else {
                if (foundUsers) {
                    res.render('submit', { foundedUsers: foundUsers });
                }
            }
        })
    } else {
        res.redirect('/login');
    }


})
    .post((req, res) => {
        User.findById(req.user._id, (err, user) => {
            if (err || user == null) {
                res.end("Error in submitting");
            }
            if (user != null) {
                user.secret = req.body.secret;
                user.save((err, update) => {
                    if (err) {
                        res.end("Error in Updating");
                    } else {
                        if (update) {
                            res.redirect('/submit');
                        }
                    }
                })
            }
        })
    });

module.exports = submitRouter;