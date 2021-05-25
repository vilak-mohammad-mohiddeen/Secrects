require('dotenv').config();
const passport = require('passport');
const User = require('../models/register');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

exports.thegoogle = passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/redirect'
}, (accesstoken, refreshtoken, profile, done) => {
    User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user)
        } else {

            user = new User({ username: profile.displayName });
            user.googleId = profile.id;
            user.save((err, data) => {
                if (err) {
                    return done(err, false);
                } else {
                    return done(null, data);
                }
            })
        }
    })
}))
