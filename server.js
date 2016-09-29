'use strict'

const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  api = require('./routes/api.js'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt'),
  session = require('express-session');

// --- Middleware --- //

app.use(express.static('public'));
app.use('/api', api);

// --- Passport Strategy --- //

app.use(passport.initialize())
  .use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  User
    .where('username', username)
    .fetch({withRelated: ['userGroup']})
    .then( user => {
      if (user) {
        user = user.toJSON();
      }
      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }

      return done(null, false);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User
    .where('id', id)
    .fetch()
    .then( user => {
      user = user.toJSON();
      var signed = {
        id:user.id,
        username:user.username
      }
      done(null, signed);
    })
})

// --- Auth --- //

function auth(req, res, next){
  !req.isAuthenticated() ? res.send(401) : next()
}

// --- Routing --- //

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
})

// --- Server --- //

app.listen(port, () => {
  console.log('Server is listening on %d', port);
});

module.exports = app;
