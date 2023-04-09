import React, { Component } from 'react';
import LoginForm from './login-form/loginForm';
import withNavigateHook from './withNavigateHook';
import './login.css';

class Login extends Component {
  
  render() {
    return (
      <div className="main-body">
        <h1 className="text-center">Login Screen</h1>
        <div className="d-flex justify-content-center mt-5">
          <LoginForm onLogin={() => {this.props.navigation('/view-orders')}}/>
        </div>
      </div>
    )
  }
}

export default withNavigateHook(Login);