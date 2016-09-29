'use strict'

const express = require('express'),
  router = express.Router(),
  User = require('../models/user.js');

router.route('/users')
  //Return list of all users.
  .get((req, res) => {

  })
  //Create new user.
  .post((req, res) => {

  })

router.route('/users/:user_id')
  // Get user by id.
  .get((req, res) => {

  })

  // Update user at this id.
  .put((req, res) => {

  })


module.exports = router;
