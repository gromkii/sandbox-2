import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router,  Redirect, Link, hashHistory } from 'react-router'
import ShowUser from 'ShowUser'
import EditUser from 'EditUser'
import Menu from 'Menu'
class LoginForm extends Component {
  constructor(){
    super()

    this.state = {
      username:'',
      password:'',
      error:false
    }
  }

  _checkLogin(){
    $.get('/auth/user')
      .then( results => {
        let u = results;
        if (u.id) {
          hashHistory.push('/menu')
        }
      });
  }

  componentWillMount(){

    /*
      This will test to see if a user session is already active.
      For right now, it just reloads their show page, but will
      change to a menu later. It doesn't need to do anything if
      there's no current logged in user.
    */
    this._checkLogin();
  }

  // Test to see if there's a user already logged in.

  _handleSubmit(e){
    e.preventDefault();
    let data = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    $.post('/auth/login', data)
      .then( results => {
        if(results.message) {
          this.setState({
            error:false
          })
          hashHistory.push('/menu')
        } else if (results.error) {
          this.setState({
            error:true
          });
        }
      });
  }

  render(){
    var userMessage = null;

    if (this.state.error) {
      userMessage = (
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          <span className="sr-only">Error:</span>
          Invalid Username/Password Password
      </div>
      )
    } else {
      userMessage = null;
    }


    return (
      <section>


        <h1 className="text-center">User Login</h1>

        <form action="/auth/login" method="post" className="form col-md-8 col-md-offset-2"
          onSubmit={this._handleSubmit.bind(this)}>
          <fieldset className="form-group">
            <label>Username</label>
            <input type="text" name="username" ref="username" className="form-control"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Password</label>
            <input type="password" name="password" ref="password" className="form-control"/>
          </fieldset>
          {userMessage}
          <fieldset className="form-group">
            <button type="submit" className="btn btn-primary form-control">Login</button>
          </fieldset>

        </form>

        <div className="form-group col-md-8 col-md-offset-2">
          <Link to="/register">
            <button className="btn btn-success form-control">
              Click here to register!
            </button>
          </Link>
        </div>
      </section>
    )
  }
}

export default LoginForm
