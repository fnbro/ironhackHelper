const express = require('express');
const feedbackRoutes = express.Router();
const User = require("../models/User");
let Survey = require('../models/feedback');

//C: create a new Survey
feedbackRoutes.post('/savesurvey', (req, res) => {
    console.log("Request to save this survey:", JSON.stringify(req.body));
    let survey = new Survey(req.body);
    console.log("survey:", survey);
    survey.save()
        .then(survey => {
            res.status(200).json(survey);
        })
        .catch(err => {
            res.status(400).send('adding new survey failed');
        });
});

//R: read alle feedbacks 
feedbackRoutes.route('/read').get(function (req, res) {
    Survey.find().then(survey => 
        res.status(200).json(survey))
  });

module.exports = feedbackRoutes;