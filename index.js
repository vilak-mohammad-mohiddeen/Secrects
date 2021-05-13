const express = require('express');
const mongoose = require('mongoose');
const homeRouter = require('./routes/homeRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');

const app = express();
mongoose.connect('mongodb://localhost:27017/secretDB', { useUnifiedTopology: true, useNewUrlParser: true });
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.listen(3000, () => {
    console.log("Server running in port 3000");
})