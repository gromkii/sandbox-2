'use strict'

var React = require('react'),
    ReactDOM = require('react-dom');

import LoginForm from 'LoginForm'
import EditUser from 'EditUser'
import ShowUser from 'ShowUser'

ReactDOM.render(
  <LoginForm />,
  document.getElementById('app')
);
