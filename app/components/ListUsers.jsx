'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Rouer, { Link } from 'react-router'
import ShowUser from 'ShowUser'

class ListUsers extends Component {
  constructor(){
    super();

    this.state = {
      users:[]
    }
  }

  componentWillMount(){
    $.get('/api/users')
      .then( results => {
        this.setState({
          users:results
        })
      })
  }

  render(){
    return(
      <div>
        <h1>User List</h1>

        <table className="table table-striped">
          <thead>
            <th>Username</th>
            <th>Name</th>
            <th>About</th>
          </thead>
          <tbody>
            {this.state.users.map(user => {
              return(
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                  <td>{user.full_name}</td>
                  <td>{user.about_me}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Link to='/menu'>
          Return to Menu
        </Link>
      </div>
    )
  }
}

export default ListUsers
