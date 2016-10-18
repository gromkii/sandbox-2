'use strict'

import React, { Component } from 'react'
import ReactDom, { render } from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import LoginForm from 'LoginForm'
import EditUser from 'EditUser'
import ShowUser from 'ShowUser'
import NewUser from 'NewUser'
import Menu from 'Menu'
import ListUsers from 'ListUsers'

render(<LoginForm />, document.getElementById('app'))
