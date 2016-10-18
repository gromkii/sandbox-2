'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Router, { hashHistory, Link } from 'react-router'
import ShowUser from 'ShowUser'

class EditUser extends Component {
  constructor(){
    super()

    this.state = {
      about_me:'',
      profile_url:'',
      full_name:''
    }
  }

  componentWillMount(){

    $.get(`/api/users/${this.props.params.id}`)
      .done( u => {
        this.setState({
          full_name:u.full_name,
          about_me:u.about_me,
          profile_url:u.profile_url
        })
      })
  }

  _handleSubmit(event){
    event.preventDefault();
    let t = event.target;

    console.log(t.about_me.value, this.state.about_me);

    let data = {
      full_name:t.full_name.value ? t.full_name.value : this.state.full_name,
      about_me:t.about_me.value ? t.about_me.value : this.state.about_me,
      profile_url:t.profile_url.value ? t.profile_url.value : this.state.profile_url
    }

    console.log(data);

    $.ajax({
      method:'PUT',
      url:`/api/users/${this.props.params.id}`,
      data:data
    }).done( results => {

      if(results.message){
        hashHistory.push(`/users/${this.props.params.id}`)
      }
    })

  }

  shouldComponentUpdate(){
    return true;
  }

  render(){
    return (
      <section>
        <form action="user/user_id?_method:PUT" method="POST" className="form" onSubmit={this._handleSubmit.bind(this)}>
          <fieldset className="form-group">
            <label>Change Name</label>
            <input type="text" className="form-control" placeholder={this.state.full_name} name="full_name"/>

          </fieldset>

          <fieldset className="form-group">
            <label>Change About Me</label>
            <textarea className="form-control" placeholder={this.state.about_me} name="about_me"></textarea>
          </fieldset>

          <fieldset className="form-group">
            <label>Change Image Url</label>
            <input type="text" className="form-control" placeholder={this.state.profile_url} name="profile_url"/>
          </fieldset>


          <button type="submit" className="btn btn-primary">Update Information</button>

          <Link to={`/users/${this.props.params.id}`}>
              <button className="btn btn-success pull-right">
                Return to Profile
              </button>
          </Link>
        </form>



      </section>
    )
  }
}

export default EditUser
