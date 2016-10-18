'use strict'

import React from 'react'
import ReactDom, { render } from 'react-dom'
import {Router, Route} from 'react-router'
import LoginForm from 'LoginForm'
import EditUser from 'EditUser'
import ShowUser from 'ShowUser'
import Menu from 'Menu'
import ListUsers from 'ListUsers'

render (
  <Router>
    <Route path="/" component={LoginForm} />
    <Route path="/users" component={ListUsers} />
    <Route path="/users/:user_id" component={ShowUser} />
    <Route path="/users/:user_id/edit" component={EditUser} />
  </Router>
)
