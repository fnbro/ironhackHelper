const express = require('express');
const feedbackRoutes = express.Router();
const User = require("../models/User");
let Survey = require('../models/feedback');

//C: create a new Survey
feedbackRoutes.route('/feedback/savesurvey').post(function (req, res) {
    console.log("Request to save this survey:" + JSON.stringify(req.body));
    let survey = new Survey(req.body);
    survey.save()
        .then(survey => {
            res.status(200).json({ 'survey': 'survey added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new survey failed');
        });
});

module.exports = assetRoutes;