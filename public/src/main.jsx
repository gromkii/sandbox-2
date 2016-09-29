'use strict'

class LoginForm extends React.Component {
  render(){
    return (
      <section>
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
            <a href="" className="btn btn-warning form-control"><i className="fa fa-github-alt" aria-hidden="true"></i> Sign In with GitHub!</a>
          </div>
        </form>

      </section>
    )
  }
}

ReactDOM.render(<LoginForm />, document.getElementById('app'));
