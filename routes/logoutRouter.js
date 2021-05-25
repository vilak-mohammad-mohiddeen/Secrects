const express = require('express');
const User = require('../models/register');
const logoutRouter = express.Router();

logoutRouter.use(express.urlencoded({ extended: true }));

logoutRouter.route('/')
    .get((req, res) => {
        req.session.destroy();
        res.clearCookie('session_id');
        res.redirect('/');
    });

module.exports = logoutRouter;