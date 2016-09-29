'use strict'

const express = require('express'),
  router = express.Router(),
  User = require('../models/user.js'),
  bcrypt = require('bcrypt');

router.route('/users')
  //Return list of all users.
  .get((req, res) => {
    User
      .fetchAll()
      .then( results => {
        res.json(results.toJSON());
      })
  })
  //Create new user.
  .post((req, res) => {
    var newUser = req.body,
        hash    = bcrypt.hashSync( newUser.password, 8);

    User.forge({
      username:newUser.username,
      email:newUser.email,
      profile_url:newUser.profile_url,
      password: hash,
      about_me:newUser.about_me
    }).save().then(() => {
      // After creating new account, return to index.
      res.redirect('/');
    });
  })

router.route('/users/:user_id')
  // Get user by id.
  .get((req, res) => {
    User
      .where('id', req.params.user_id)
      .fetch()
      .then( results => {
        res.json(results.toJSON())
      })
  })

  // Update user at this id.
  .put((req, res) => {
    var u = req.body;

    User
      .forge({id:req.params.user_id})
      .save({
        email:u.email,
        about_me:u.email,
        profile_url:u.profile_url
      })
      .then( results => {
        console.log(results.toJSON());
        res.redirect('/')
      })
  })


module.exports = router;
