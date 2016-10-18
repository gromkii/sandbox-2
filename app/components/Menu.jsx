import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Router, { Link, hashHistory } from 'react-router'
import ShowUser from 'ShowUser'
import ListUsers from 'ListUsers'

class Menu extends Component {
  constructor(){
    super()

    this.state = {
      full_name:'',
      id:null
    }
  }

  _getUser(){
    $.get('/auth/user')
      .then( user => {
        $.get(`/api/users/${user.id}`)
        .then(results => {
          return results
        })
      })
  }

  componentWillMount(){
    $.get('/auth/user')
      .then( user => {
        if (!user.id){
          hashHistory.push('/login')
        }

        $.get(`/api/users/${user.id}`)
          .then(results => {
            let u = results
            if (u.id){
              this.setState({
                full_name:u.full_name,
                id:u.id
              })
            } else {
              hashHistory.push('/login');
            }
        })
      })
  }

  render(){
    return (
      <div>
        <h1>Welcome back, {this.state.full_name}</h1>

        <h2><Link to={`/users/${this.state.id}`}>My Profile</Link></h2>
        <h2><Link to="/users">Show All Users</Link></h2>
        <h2><a href="/auth/logout">Logout</a></h2>
      </div>
    )
  }
}

export default Menu
