import React, { Component } from "react";
import "./css/Login.css";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import withNavigate from './withNavigate';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);

  }

  loginSubmit = (event) => {
    event.preventDefault();
    let credentials = {email: this.state.username, password: this.state.password};
    console.log(credentials);
    UserService.loginUser(credentials).then(res=>{
      if (res.data) {
        console.log('success');
        // navigate('/organizations');
        // return redirect('/organizations');
        this.props.navigate('/organizations');
      } else {
        console.log('failure');
      }
      // console.log(res.data);
    })
  }

  changeUsernameHandler= (event) => {
    this.setState({username: event.target.value});
  }

  changePasswordHandler= (event) => {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <>
        <div className="login-wrapper">
          <h1 className="title">LOGIN</h1>
          <form>
            <label>
              <p>Username</p>
              <input required type="email" value={this.state.username} onChange={this.changeUsernameHandler}/>
            </label>
            <label>
              <p>Password</p>
              <input required type="password" value={this.state.password} onChange={this.changePasswordHandler}/>
            </label>
            <div className="button-container">
              <button className="btn btn-wide" onClick={this.loginSubmit}>Login</button>
            </div>
            <p>Don't have an account?</p>
            <div className="button-container">
              <Link to="/sign-up"><button className="btn btn-wide">Sign up here</button></Link>
            </div>
          </form>

        </div>
      </>
    );
  }
}

export default withNavigate(Login);
