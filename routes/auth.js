'use strict'

const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  passport = require('passport');

router.post('/login', passport.authenticate('local', { failureRedirect:'/auth/fail'}), (req, res) => {
  res.json({
    message:'Did the thing.',
    user:req.user
  });
})

/*
  This route allows you to access the current signed in user's
  information, which is makes it easier to populate the user
  profile page. If there is no current user, an error message is
  returned.
*/
router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user)
  }
  res.json({error:'No user found.'});
})


/*
  If the login fails, returns error message.
*/
router.route('/fail')
  .get((req, res) => {
    res.json({error:"Something went wrong."});
  })

module.exports = router;
