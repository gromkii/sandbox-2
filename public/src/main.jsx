'use strict'

class LoginForm extends React.Component {
  render(){
    return (
      <section>
        <h1 className="text-center">User Login</h1>

        <form action="/auth/login" method="post" className="form col-md-8 col-md-offset-2">
          <fieldset className="form-group">
            <label>Username</label>
            <input type="text" name="username" className="form-control" />
          </fieldset>
          <fieldset className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" />
          </fieldset>
          <fieldset className="form-group">
            <button type="submit" className="btn btn-primary form-control">Login</button>
          </fieldset>
          <div className="form-group">
            <a href="" className="btn btn-success form-control">Click here to register!</a>
          </div>
          <div className="form-group">
            <a href="" className="btn black-background form-control"><i className="fa fa-github-alt" aria-hidden="true"></i> Sign In with GitHub!</a>
          </div>
        </form>
      </section>
    )
  }
}

class ShowUser extends React.Component {
  constructor(){
    super()

    this.state = {
      username:'',
      email:'',
      about_me:'',
      profile_url:'',
    }
  }

  _getUser(){
    $.ajax({
      method:'GET',
      url:'/api/users/1'
    }).done( results => {
      let u = results;
      this.setState({
        username:u.username,
        email:u.email,
        about_me:u.about_me,
        profile_url:u.profile_url
      });
    })

  }

  componentDidMount(){
    this._getUser();
    // Set the state.
  }

  render(){
    return (
      <section className="row">
        <div className="col-md-6">
          <h1>{this.state.username}</h1>
          <p>{this.state.about_me}</p>
        </div>
        <div className="col-md-6">
          <img className="img-circle pull-right " src={this.state.profile_url} width="75%"/>
        </div>
      </section>
    )
  }
}

ReactDOM.render(<ShowUser />, document.getElementById('app'));
