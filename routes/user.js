const express = require('express');
const route = express.Router();


let User = require('../models/User');

//R: read all Users

route.route('/read').get(function (req, res) {
  console.log("got a request for users");
  User.find(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});