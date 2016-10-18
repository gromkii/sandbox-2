'use strict'

import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
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
    <Route path="/" component={Main}>
      <IndexRoute component={LoginForm}/>
      <Route path="register" component={NewUser}/>
      <Route path="menu" component={Menu} />
      <Route path="login" component={LoginForm}/>
      <Route path="users" component={Main}>
        <IndexRoute component={ListUsers}/>
        <Route path=":id" component={ShowUser}/>
        <Route path=":id/edit" component={EditUser}/>
      </Route>
    </Route>
  </Router>,

  document.getElementById('app')
)
