const express = require('express');
const newsRoutes = express.Router();
const User = require("../models/User");
let News = require('../models/News');

//C: create a new Survey
newsRoutes.route('/add').post(function (req, res) {
    console.log("Request to save this news:" + JSON.stringify(req.body));
    let news = new News(req.body);
    news.save()
        .then(news => {
            res.status(200).json(news);
        })
        .catch(err => {
            res.status(400).send('adding new news failed');
        });
});

//R: read alle news 
newsRoutes.route('/read').get(function (req, res) {
  News.find().then(user => 
      res.status(200).json(user))
});

//D: delete the news with the given id
newsRoutes.route('/delete/:id').post(function (req, res) {
  News.findByIdAndDelete(req.params.id, function (err, news) {
      if (!news)
          res.status(404).send("data is not found");
      else
          res.json('news deleted!');
  });
});

module.exports = newsRoutes;