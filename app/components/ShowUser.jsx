'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Router, { Link } from 'react-router'
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
      id:null,
      current:false
    }
  }

  _getUser(){
    $.ajax({
      method:'GET',
      url:`/api/users/${this.props.params.id}`
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
    var store = this;
    store._getUser()
    $.get('/auth/user')
      .then( user => {
        if(user.id && user.id === parseInt(store.props.params.id)){
          store.setState({
            current:true
          })
        }
      });
  }

  _editProfile(){
    if(this.state.current){
      return(
        <Link to={`/users/${this.props.params.id}/edit`}>
          <button className="btn btn-success">
            Edit Profile
          </button>
        </Link>
      )
    }
  }

  _goToMenu(){
    ReactDOM.render(<Menu user={this.state.user} />, document.getElementById('app'));
  }

  _isCurrentUser(){
    $.get('/auth/user')
      .then(user => {
        if (user.id && user.id == parseInt(this.props.params.id)) {
          return true
        }
        return false
      })
  }

  shouldComponentUpdate(){
    return true;
  }

  render(){
    return (
      <section className="row">
        <h1 className="text-center">User Profile</h1>
        <div className="col-md-6 profile">
          <h1>{this.state.username}</h1>
          <h3>{this.state.full_name}</h3>
          <p>{this.state.about_me}</p>
          <Link to="/menu">
            <button className="but btn-primary">
              Return to Menu
            </button>
          </Link>

          {this._editProfile()}

          <Link to="/users">
            Show User List
          </Link>
        </div>
        <div className="col-md-6">
          <img className="img-circle pull-right " src={this.state.profile_url} width="75%"/>
        </div>
      </section>
    )
  }
}

export default ShowUser
