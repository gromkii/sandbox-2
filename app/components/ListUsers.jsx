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

        console.log(this.state);
      })
  }

  render(){
    return(
      <div>
        <h1>User List</h1>

        <table className="table table-striped">
          {this.state.users.map(user => {
            return(
              <tr>
                <td>{user.full_name}</td>
                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}

export default ListUsers
