const express = require('express');

const secretRouter = express.Router();
secretRouter.use(express.urlencoded({ extended: true }));

secretRouter.route('/')
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render('secrets');
        }
        else {
            res.redirect('/login');
        }
    });

module.exports = secretRouter;