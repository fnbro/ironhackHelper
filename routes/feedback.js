const express = require('express');
const feedbackRoutes = express.Router();
const User = require("../models/User");
let Survey = require('../models/feedback');

//C: create a new Survey
feedbackRoutes.post('/savesurvey', (req, res) => {
    console.log("Request to save this survey:", req.body);
    let survey = new Survey(req.body);
    console.log("survey:", survey);
    survey.save()
        .then(survey => {
            res.status(200).json({ 'survey': 'survey added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new survey failed');
        });
});

//now we define the rest endpoints for the CRUD methods and implement the CRUD methods
//R: read all assets

feedbackRoutes.route('/read').get(function (req, res) {
    console.log("got a request");
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
        } else {
            res.json(surveys);
        }
    });
});


//U: update the Survey with the given id
// post -> put


feedbackRoutes.route('/update/:id').put(function (req, res) {
    Survey.findById(req.params.id, function (err, survey) {
        if (!survey) res.status(404).send("Survey to update not found, asset _id:" + req.params.id);
        else {
            survey.asset_id = req.body.asset_id;
            survey.asset_name = req.body.asset_name;
            survey.asset_value = req.body.asset_value;

            survey.save().then(survey => {
                res.json('survey updated!');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});



module.exports = feedbackRoutes;