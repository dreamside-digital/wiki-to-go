import React, { PropTypes } from 'react';


export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleLogin = (e) => this._handleLogin(e);
    this.openRegistrationModal = (e) => this._openRegistrationModal(e);
  }

  render() {
    return (
      <form className="navbar-form navbar-right" id="login-form">
        <div className="form-group">
          <input type="text" name="email" className="form-control" placeholder="Email" />
          <input type="password" name="password" className="form-control" placeholder="Password" />
        </div>
        <button className="btn btn-default" id="login-submit" onClick={this.handleLogin}>
          Log in
        </button>
        <a href="#" className="btn btn-info" id="sign-up" onClick={this.openRegistrationModal}>Sign up</a>
      </form>
    );
  };

  _handleLogin(event) {
    event.preventDefault();
    const userData = {
      user : {
        email: $('#login-form input[name="email"]').val(),
        password: $('#login-form input[name="password"]').val(),
      }
    }
    const component = this;

    $.ajax({
       url: 'users/sign_in',
       data: JSON.stringify(userData),
       dataType:'json',
       contentType: 'application/json',
       type:'POST',
       success: function(data) {
        component.props.updateUser(data.user);
        this.props.notify(`Welcome back, ${data.user.first_name}!`);
       },
       error: function(err) {
        this.props.notify(err.responseJSON.error);
       }
    });
  };

  _openRegistrationModal(event) {
    event.preventDefault();
    $('#registration-modal').modal('show');
  }
};