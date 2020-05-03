import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import "./Login.css";
import LoginStatusUtility from "../_common/LoginStatusUtility";
import { GET_LOGIN_API_URL, BACKEND_API_HOST } from "../_common/constants";

class Login extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.refererLocation = this.props.location.state || {
      refererLocation: { pathname: "/app" },
    };
    if(this.refererLocation.pathname === "/login") {
      this.refererLocation.pathname = "/app";
    }
    this.state = { loginURL: "" };
  }

  componentDidMount() {
    console.log(GET_LOGIN_API_URL);
    // getting login URL
    fetch(GET_LOGIN_API_URL)
      .then(res => res.json())
      .then(result => {
        this.setState({
          loginURL: result.url
        });
      });
    // adding event listeners
    this.loginChildWindowMessageHandlerRef = this.loginChildWindowMessageHandler.bind(
      this
    );
    window.addEventListener("message", this.loginChildWindowMessageHandlerRef);
  }

  loginChildWindowMessageHandler(event) {
    if (event.origin !== BACKEND_API_HOST) {
      return;
    }
    if (event.data.isLoginSuccess === true) {
      LoginStatusUtility.setLoggedInLoginStatus();
      this.props.history.replace(this.refererLocation);
    }
    this.loginChildWindow.close();
  }

  openLoginWindow() {
    const left = (window.screen.width - 500) / 2;
    const top = (window.screen.height - 500) / 2;
    this.loginChildWindow = window.open(
      this.state.loginURL,
      "loginwindow",
      `height=500,width=500,left=${left},top=${top}`
    );
  }

  render() {
    if(LoginStatusUtility.isLoggedIn()) {
      return (
        <Redirect to={this.refererLocation} />
      );
    }
    return (
      <div className="login-container">
        <h1 data-testid="bugmanager-h1">Bug Manager</h1>
        <h2 className="login-title" data-testid="login-h2">
          Login
        </h2>
        {this.state.loginURL !== "" ? (
          <button
            data-testid="google-singin-button"
            className="signin-button"
            onClick={this.openLoginWindow.bind(this)}
          ></button>
        ) : (
          <p className="singin-loading-message">Loading...</p>
        )}
      </div>
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "message",
      this.loginChildWindowMessageHandlerRef
    );
  }
}

export default withRouter(Login);
