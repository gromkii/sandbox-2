import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ShowUser from 'ShowUser'
import EditUser from 'EditUser'

class LoginForm extends Component {
  constructor(){
    super()

    this.state = {
      username:'',
      password:''
    }
  }

  _handleSubmit(e){
    e.preventDefault();
    let data = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    this._postLogin(data);
  }

  _postLogin(data){
    $.post('/auth/login', data)
      .done( results => {
        if(results.message){
          ReactDOM.render(<ShowUser user = {results.user} />, document.getElementById('app'));
        }
      })
  }

  _newUser(){
    ReactDOM.render(<NewUser />, document.getElementById('app'));
  }

  render(){
    return (
      <section>
        <h1 className="text-center">User Login</h1>

        <form action="/auth/login" method="post" className="form col-md-8 col-md-offset-2"
          onSubmit={this._handleSubmit.bind(this)}>
          <fieldset className="form-group">
            <label>Username</label>
            <input type="text" name="username" className="form-control"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control"/>
          </fieldset>
          <fieldset className="form-group">
            <button type="submit" className="btn btn-primary form-control">Login</button>
          </fieldset>

        </form>

        <div className="form-group col-md-8 col-md-offset-2">
          <button className="btn btn-success form-control" onClick={this._newUser.bind(this)}>Click here to register!</button>
        </div>
      </section>
    )
  }
}

ReactDOM.render(<LoginForm />, document.getElementById('app'));


export default LoginForm
