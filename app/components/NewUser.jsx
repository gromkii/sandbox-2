import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ShowUser from 'ShowUser'

class NewUser extends Component {
  _handleSubmit(event){
    event.preventDefault();

    console.log(event.target);

    let t = event.target;


    let data = {
      username:t.username.value,
      password:t.password.value,
      email:t.email.value,
      full_name:t.full_name.value,
      about_me:t.about_me.value,
      profile_url:t.profile_url.value,
    }

    console.log(data);

    $.ajax({
      method:'POST',
      url:'/api/users',
      data:data
    }).done(results => {
      if (results.user) {
        ReactDOM.render(<ShowUser user={results.user} />, document.getElementById('app'));
      } else {
        console.log('Error!');
      }
    })
  }

  render(){
    return (
      <section>
        <form className="col-md-8 col-md-offset-2" onSubmit={this._handleSubmit.bind(this)}>
          <fieldset className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" name="username"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" name="email"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-control" name="full_name"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Profile Image Url</label>
            <input type="text" className="form-control" name="profile_url"/>
          </fieldset>
          <fieldset className="form-group">
            <label>About Me</label>
            <textarea className="form-control" name="about_me"></textarea>
          </fieldset>

          <button type="submit" className="btn btn-success">
            Register New Account
          </button>
        </form>
      </section>
    )
  }
}

export default NewUser
