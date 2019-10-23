const express = require('express');
const router = express.Router();


let User = require('../models/User');

//R: read all Users

router.route('/read').get(function (req, res) {
  console.log("got a request for users");
  User.find(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});


module.exports = router;