import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <div className="form_group">
          <div className="form_label">Username: </div>
          <div className="form_input">
            <input id="username" type="text" value={this.props.login.username} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_label">Password: </div>
          <div className="form_input">
            <input id="password" type="text" value={this.props.login.password} onChange={(event) => {this.props.updateValue(event.target.id,event.target.value);}} />
          </div>
        </div>
        <div className="form_group">
          <div className="form_submit base_link" onClick={(event) => {this.props.sendLogin(this.props.login)}}>Submit</div>
        </div>
      </div>
    );
  }
}

const LoginContainer = ReactRedux.connect(
  state => ({
    login: state.login
  }),
  actions
)(Login);

export default LoginContainer;
