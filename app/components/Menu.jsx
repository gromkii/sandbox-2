import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ShowUser from 'ShowUser'
import ListUsers from 'ListUsers'

class Menu extends Component {
  constructor(){
    super()

    // Get signed user, add it to menu state.


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

  _showUserPage(id){
    ReactDOM.render(<ShowUser user={this.state.id} />, document.getElementById('app'));
  }

  _showUserList(){
    ReactDOM.render(<ListUsers />, document.getElementById('app'));
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

        <button className="btn btn-success" onClick={this._showUserPage.bind(this)}>Show My Page</button>
        <button className="btn btn-success" onClick={this._showUserList.bind(this)}>Show User List</button>
      </div>
    )
  }
}

export default Menu
