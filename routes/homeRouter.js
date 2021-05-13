const express = require('express');

const homeRouter = express.Router();
homeRouter.use(express.urlencoded({ extended: true }));

homeRouter.route('/')
    .get((req, res) => {
        res.render('index');
    });

module.exports = homeRouter;