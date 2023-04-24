import React, { Component } from 'react';
import SignUpForm from './sign-up-form/signUpForm';
import './sign-up.css';

class SignUp extends Component {

  render() {
    return (
      <div className="main-body">
        <h1 className="text-center">Sign Up</h1>
        <div className="d-flex justify-content-center mt-5">
          <SignUpForm onSignUp={() => { this.props.history.push('/login') }} />
        </div>
        <div>
          <a href="/login">Go to login</a>
        </div>
      </div>
    )
  }
}

export default SignUp;