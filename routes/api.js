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
      full_name:newUser.full_name,
      email:newUser.email,
      profile_url:newUser.profile_url,
      password: hash,
      about_me:newUser.about_me
    }).save().then( results => {
      // After creating new account, return to new user info.
      res.json({user:results.toJSON()})
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
        full_name:u.full_name,
        about_me:u.about_me,
        profile_url:u.profile_url
      })
      .then( results => {
        res.json({
          message:'Updated successfully.',
          user:results.toJSON()
        });
      })
  })


module.exports = router;
