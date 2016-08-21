class LogoutForm extends React.Component {
  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="#" className="menu-white-text" aria-expanded="false"> {`Hi ${this.props.current_user.first_name}!`}</a>
        </li>
        <li>
          <a href="#" className="menu-white-text" id="logout" onClick={this._handleLogout.bind(this)}>Logout</a></li>
      </ul>
    )
  }

  _handleLogout(event) {
    event.preventDefault();
    const component = this;

    $.ajax({
      url: 'users/sign_out',
      data: '',
      dataType:'json',
      contentType: 'application/json',
      type:'DELETE',
      success: function(data) {
        component.props.updateUser(false);
        new FlashMessage(`You have been logged out.`, 4000);
      },
      error: function(err) {
        new FlashMessage(`There was an error in logging out you, please try again.`, 4000);
      }
    });
  };
}

