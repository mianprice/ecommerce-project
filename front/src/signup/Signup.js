import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Signup.actions';

class Signup extends React.Component {
  render() {
    return (
      <div className="signup">
        <div className="form_group">
          <div className="form_label">Username: </div>
          <div className="form_input">
            <input id="username" type="text" value={this.props.signup.username} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">Password: </div>
          <div className="form_input">
            <input id="password" type="text" value={this.props.signup.password} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">Confirm Password: </div>
          <div className="form_input">
            <input id="password_confirm" type="text" value={this.props.signup.password_confirm} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">Email Address: </div>
          <div className="form_input">
            <input id="email" type="text" value={this.props.signup.email} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">First Name: </div>
          <div className="form_input">
            <input id="first" type="text" value={this.props.signup.first} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">Last Name: </div>
          <div className="form_input">
            <input id="last" type="text" value={this.props.signup.last} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_submit base_link" onClick={(event) => {this.props.sendSignup(this.props.signup)}}>Submit</div>
        </div>
      </div>
    );
  }
}

const SignupContainer = ReactRedux.connect(
  state => ({
    signup: state.signup
  }),
  actions
)(Signup);

export default SignupContainer;
