import NotificationHelper from './NotificationHelper';

class LoginForm extends React.Component {
  render() {
    return (
      <form className="navbar-form navbar-right" id="login-form">
        <div className="form-group">
          <input type="text" name="email" className="form-control" placeholder="Email" />
          <input type="password" name="password" className="form-control" placeholder="Password" />
        </div>
        <button className="btn btn-default" id="login-submit" onClick={this._handleLogin.bind(this)}>
          Log in
        </button>
        <a href="#" className="btn btn-info" id="sign-up" onClick={this._launchRegistrationModal}>Sign up</a>
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

         new FlashMessage(`Welcome back, ${data.user.first_name}!`, 4000);
       },
       error: function(err) {
        new FlashMessage(err.responseJSON.error, 4000);
       }
    });
  };

  _launchRegistrationModal(event) {
    event.preventDefault();
    $('#registration-modal').modal('show');
  }
};