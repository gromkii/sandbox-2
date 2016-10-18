'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import EditUser from 'EditUser'
import Menu from 'Menu'

class ShowUser extends Component {
  constructor(){
    super()

    this.state = {
      user:{},
      username:'',
      email:'',
      about_me:'',
      profile_url:'',
      full_name:'',
      id:null
    }
  }

  _getUser(){
    $.ajax({
      method:'GET',
      url:`/api/users/${this.props.user}`
    }).done( results => {
      let u = results

      this.setState({
        user: u,
        username:u.username,
        email:u.email,
        about_me:u.about_me,
        profile_url:u.profile_url,
        full_name:u.full_name,
        id:u.id
      });
    });

  }

  componentWillMount(){
    let u = this._getUser()
  }

  _editProfile(){
    ReactDOM.render(<EditUser user={this.state.user.id} />, document.getElementById('app'));
  }

  _goToMenu(){
    ReactDOM.render(<Menu user={this.state.user} />, document.getElementById('app'));
  }

  render(){
    return (
      <section className="row">
        <h1 className="text-center">User Profile</h1>
        <div className="col-md-6 profile">
          <h1>{this.state.username}</h1>
          <h3>{this.state.full_name}</h3>
          <p>{this.state.about_me}</p>
          <button className="btn btn-primary" onClick={this._goToMenu.bind(this)}>Return to Menu</button>
          <button className="btn btn-success" onClick={this._editProfile.bind(this)}>Edit Profile</button>
        </div>
        <div className="col-md-6">
          <img className="img-circle pull-right " src={this.state.profile_url} width="75%"/>
        </div>


        </section>
    )
  }
}

export default ShowUser
