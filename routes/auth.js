'use strict'

const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  passport = require('passport');

router.post('/login', passport.authenticate('local', { failureRedirect:'/auth/fail'}), (req, res) => {
  res.json({message:'Success!'});
})

router.get('/user', (req, res) => {
  res.json(res.user);
})

router.route('/fail')
  .get((req, res) => {
    res.json({error:"Something went wrong."});
  })

module.exports = router;
