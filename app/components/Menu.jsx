import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ShowUser from 'ShowUser'
import ListUsers from 'ListUsers'
import Router, { Link } from 'react-router'

class Menu extends Component {
  constructor(){
    super()

    this.state = {
      full_name:'',
      id:null
    }
  }

  _getUser(){
    let u = this.props.user

    $.get(`/api/users/${u.id}`)
      .then(results => {
        return results;
      })
  }

  componentWillMount(){
    let u = this.props.user

    this.setState({
      full_name:u.full_name,
      id:u.id
    });
  }

  render(){
    return (
      <div>
        <h1>Welcome back, {this.state.full_name}</h1>

        <h2><Link to={`/users/${this.state.id}`}>My Profile</Link></h2>
        <h2><Link to="/users">Show All Users</Link></h2>
      </div>
    )
  }
}

export default Menu
