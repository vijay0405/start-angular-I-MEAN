const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({ message: "user created", result: result });
        })
        .catch(error => {
          res.status(500).json({ error: error });
        })
    })
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "auth failed" });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if (!result)
        return res.status(401).json({ message: "auth failed" });
      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, "dsfadfsfl2erkndf", { expiresIn: "1h" });
      res.status(200).json({ message: "login success", token: token, expiresIn: 3600, userId: fetchedUser._id });
    })
    .catch(err => {
      return res.status(401).json({ message: "auth failed" });
    })
});

module.exports = router;
