import React, { Component } from "react";
import "./css/Login.css";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit = (event) => {
    event.preventDefault();
    let credentials = {
      email: this.state.username,
      password: this.state.password,
    };
    console.log(credentials);
    UserService.loginUser(credentials).then((res) => {
      if (res.data) {
        console.log("success");
        console.log(res.data);
        // navigate('/organizations');
        // return redirect('/organizations');
        if (res.data.userType === 'V') {
          console.log(res.data.userType);
          this.props.navigate("/user-profile", {state: res.data});
        } else if (res.data.userType === 'O') {
          console.log(res.data.userType);
          this.props.navigate("/create-opportunity", {state: res.data});
        }
        // this.props.navigate("/user-profile", {state: res.data});
      } else {
        console.log("failure");
        console.log(res.data);
      }
      // console.log(res.data);
    });
  };

  changeUsernameHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <>
        <div className="login-wrapper">
          <h1 className="title">LOGIN</h1>
          <form>
            <label>
              <p>Username</p>
              <input
                required
                type="email"
                value={this.state.username}
                onChange={this.changeUsernameHandler}
              />
            </label>
            <label>
              <p>Password</p>
              <input
                required
                type="password"
                value={this.state.password}
                onChange={this.changePasswordHandler}
              />
            </label>
            <div className="forgot-password">
              <a className="link link-hover" href="/reset-password">Forgot password</a>
            </div>
            <div className="button-container">
              <button className="btn btn-wide" onClick={this.loginSubmit}>
                Login
              </button>
            </div>
            <br />
            <p>Don't have an account?</p>
            <div className="button-container">
              <Link to="/sign-up">
                <button className="btn btn-wide">Sign up here</button>
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(Login);
