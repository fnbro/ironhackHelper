const express = require('express');
const newsRoutes = express.Router();
const User = require("../models/User");
let News = require('../models/News');

//C: create a new Survey
newsRoutes.route('/add').post(function (req, res) {
    console.log("Request to save this survey:" + JSON.stringify(req.body));
    let news = new News(req.body);
    news.save()
        .then(news => {
            res.status(200).json({ 'news': 'news added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new news failed');
        });
});

newsRoutes.route('/read').get(function (req, res) {
  console.log("got a request for news");
  News.find(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

module.exports = newsRoutes;