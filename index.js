const express = require('express');
const passportSetup = require('./config/passportsetup');
const mongoose = require('mongoose');
const homeRouter = require('./routes/homeRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const authRouter = require('./routes/authRouter');
const secretRouter = require('./routes/secretRouter');
const logoutRouter = require('./routes/logoutRouter');
const submitRouter = require('./routes/submitRouter');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/register');
const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({
    name: "session_id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/auth', authRouter);
app.use('/secret', secretRouter);
app.use('/submit', submitRouter);
mongoose.connect('mongodb+srv://MoinVilak:' + process.env.CLUSTER_PASSWORD + '@cluster0.sgkrd.mongodb.net/secretDB', { useUnifiedTopology: true, useNewUrlParser: true });

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.listen(3000, () => {
    console.log("Server running in port 3000");
})