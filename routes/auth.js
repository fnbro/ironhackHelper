const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;




router.post("/signup", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const userPassword = req.body.password;
  const isMember = false;
  const isAdmin = false;
  const confirmpassword = req.body.confirmpassword;


  User.findOne({ username }, "username", (err, user) => {
    if (username === "" || userPassword === "") {
      res.status(200).json({ errorMessage: "Type in a Username and a Password" });
      return;
    }
    if (user !== null) {
      console.log("User with username exists already:" + username);
      res.status(200).json({ errorMessage: 'this user already exists' });
      return;
    }
    if (userPassword !== confirmpassword) {

      res.status(200).json({ errorMessage: 'Type the same Password' });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const password = bcrypt.hashSync(userPassword, salt);

    const userPassworEncrypted = { username, password, firstname, lastname, isMember, isAdmin };
    console.log("User will be created:" + userPassworEncrypted);
    User
      .create(userPassworEncrypted)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(err => console.log(err));
  });
});



router.post("/login", (req, res) => {
  const username = req.body.username;
  const userPassword = req.body.password;
  if (username === "" || userPassword === "") {
    res.status(200).json({ errorMessage: "Type in a Username and a Password" });
    return;
  }
  User.findOne({ username }, (err, user) => {
    if (err || !user) {
      res.json({ errorMessage: "The username doesn't exist." });
    } else {
      if (bcrypt.compareSync(userPassword, user.password)) {
        req.session.currentUser = user;
        res.status(200).json(user);
      } else {
        res.json({ errorMessage: "Incorrect password." });
      }
    }
  });
});


router.get("/logout", (req, res, next) => {
  if (!req.session.currentUser) {
    res.status(200).json({ errorMessage: "logged out" });
    return;
  }
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ errorMessage: "logged out" });
    }
  });
});


router.put("/settings", (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body, {'new': true}).then(user => {
    res.status(200).json(user);
  }).catch(err => console.log(err));
});


router.post("/password", (req, res) => {
  const userPassword = req.body.oldpassword;
  const newPassword = req.body.newpassword;
  const id = req.body._id

console.log(userPassword)

const salt = bcrypt.genSaltSync(bcryptSalt);
const passwordEn = bcrypt.hashSync(userPassword, salt);

  User.findById(id, (err, user) => {
    if (newPassword === "") {
      res.status(200).json({ errorMessage: "Empty Password" });
      return;
    }
    //if (passwordEn !== password) {
    //  res.status(200).json({ errorMessage: "Mauli" });
     // return;
    //}
    if (newPassword !== userPassword) {
      res.status(200).json({ errorMessage: "Type the same password" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const password = bcrypt.hashSync(newPassword, salt);
    User
      .findByIdAndUpdate(id, { $set: { password: password }})
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;