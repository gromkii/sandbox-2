'use strict'

const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  passport = require('passport');

router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/auth/fail`'
  }))

router.route('/fail')
  .get((req, res) => {
    res.json({error:"Something went wrong."});
  })

module.exports = router;
