import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmail } from "validator";
import { createUser } from '../../../redux/actions/authActions'

const mapActionsToProps = dispatch => ({
  createAccount(email, password) {
    dispatch(createUser(email, password))
  }
})

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
}

class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: '',
      password: ''
    }
  }

  signUp(e) {
    e.preventDefault();
    if(validateForm(this.state.errors)) {
      this.props.createAccount(this.state.email, this.state.password);
      alert('Account created successfully');
      this.props.onSignUp();
    }
  }

  onChange(event) {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
  
      switch (name) {
        case 'email': 
          errors.email = 
            isEmail(value)
              ? ''
              : 'Email is not valid!';
          break;
        case 'password': 
          errors.password = 
            value.length < 8
              ? 'Password must be at least 8 characters long!'
              : '';
          break;
        default:
          break;
      }
  
      this.setState({errors, [name]: value});
  }

  render() {
    const {errors} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="test@test.com" name="email" value={this.state.email} onChange={e => this.onChange(e)} ></input>
          {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" className="form-control" id="inputPassword" name="password" value={this.state.password} onChange={e => this.onChange(e)}></input>
          {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={e => this.signUp(e)} type="submit" className="btn btn-primary">Create Account</button>
        </div>
      </form>
    );
  }
}

export default connect(null, mapActionsToProps)(SignUpForm);