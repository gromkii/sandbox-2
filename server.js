'use strict'

const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  api = require('./routes/api.js'),
  auth = require('./routes/auth.js'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt'),
  User = require('./models/user'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

// --- Middleware --- //

app.use(express.static('public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(methodOverride('_method'))
  .use(session({
    secret:'hey',
    resave: false,
    saveUninitialized: false
  }));


// --- Passport Strategy --- //

app.use(passport.initialize())
  .use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  User
    .where('username', username)
    .fetch()
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


// --- Routing --- //
app.use('/api', api)
  .use('/auth', auth)
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
})

// --- Server --- //

app.listen(port, () => {
  console.log('Server is listening on %d', port);
});

module.exports = app;
