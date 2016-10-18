'use strict'

import React, { Component } from 'react'
import ReactDom, { render } from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import LoginForm from 'LoginForm'
import EditUser from 'EditUser'
import ShowUser from 'ShowUser'
import NewUser from 'NewUser'
import Menu from 'Menu'
import Main from 'Main'
import ListUsers from 'ListUsers'

render(
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
  </Router>,
  document.getElementById('app')
)
