class RegistrationModal extends React.Component {

  _handleSubmitRegistration(event) {
    event.preventDefault();
    const userData = {
      user : {
        first_name: $('#firstName').val(),
        last_name: $('#lastName').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        password_confirmation: $('#passwordConfirmation').val(),
      }
    }
    const component = this;

    $.ajax({
      url: 'users',
      data: JSON.stringify(userData),
      dataType:'json',
      contentType: 'application/json',
      type:'POST',
      success: function(data) {
        if (data.status == 'success') {
          $('#registration-modal').modal('hide');
          component.props.updateUser(data.user);
          new FlashMessage("Welcome to WikiToGo!", 4000);
        } else {
          $('#registration-modal').modal('hide');
          const errMessage = data.errors.join(', ');
          new FlashMessage(`We were unable to register your account: ${errMessage}`, 4000);
        }
      },
      error: function(err) {
        new FlashMessage(err.responseJSON.error, 4000);
      }
    });
  };

  render() {
    return (
      <div className="modal fade" id="registration-modal" tabindex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Sign up</h4>
            </div>
            <div className="modal-body">
              <div className='user-profile-registration-form'>

                <div className="user-profile-registration-form-fields">
                  <form id="registration-form">
                    <div className="form-group">
                      <label for="firstName">First name</label>
                      <input type="text" id="firstName" placeholder="First name" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label for="lastName">Last name</label>
                      <input type="text" id="lastName" placeholder="Last name" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label for="email">Email</label>
                      <input type="text" id="email" placeholder="Email" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label for="password">Password</label>
                      <input type="password" id="password" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label for="passwordConfirmation">Password Confirmation</label>
                      <input type="password" id="passwordConfirmation" className="form-control"/>
                    </div>
                  </form>
                </div>
              </div>
              </div> 
            <div className="modal-footer">
              <button className="btn" onClick={this._handleSubmitRegistration.bind(this)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};