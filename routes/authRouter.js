const express = require('express');
const passport = require('passport');
const passportsetup = require('../config/passportsetup');
const authRouter = express.Router();
authRouter.use(express.urlencoded({ extended: true }));

authRouter.route('/google').get(passport.authenticate('google', { scope: ['profile'] }));

authRouter.route('/google/redirect').get(passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/secret');
})


module.exports = authRouter;