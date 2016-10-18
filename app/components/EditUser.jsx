'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ShowUser from 'ShowUser'

class EditUser extends Component {
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
    $.get(`/api/users/${this.props.user}`)
      .done( results => {
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

        console.log('Done', this.state);
    });
  }

  componentWillMount(){
    this._getUser();
  }

  _handleChange(event){

  }

  _handleSubmit(event){
    event.preventDefault();
    let t = event.target;

    let data = {
      full_name:t.full_name.value,
      about_me:t.about_me.value,
      profile_url:t.profile_url.value
    }

    $.ajax({
      method:'PUT',
      url:`/api/users/${this.props.user}`,
      data:data
    }).done( results => {

      if(results.message){
        ReactDOM.render(<ShowUser user={results.user.id} />, document.getElementById('app'));
      }
    })

  }

  render(){
    return (
      <section>
        <form action="user/user_id?_method:PUT" method="POST" className="form" onSubmit={this._handleSubmit.bind(this)}>
          <fieldset className="form-group">
            <label>Change Name</label>
            <input type="text" className="form-control" defaultValue={this.state.full_name} name="full_name"/>
          </fieldset>

          <fieldset className="form-group">
            <label>Change About Me</label>
            <textarea className="form-control" defaultValue={this.state.about_me} name="about_me"></textarea>
          </fieldset>

          <fieldset className="form-group">
            <label>Change Image Url</label>
            <input type="text" className="form-control" defaultValue={this.state.profile_url} name="profile_url"/>
          </fieldset>


          <button type="submit" className="btn btn-lg btn-primary">Update Information</button>
        </form>


      </section>
    )
  }
}

export default EditUser
