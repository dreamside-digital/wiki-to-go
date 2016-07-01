var UserAccount = function() {
  $('#sign-up').on('click', function() {
    $('#registration-modal').modal('show')
  }
  $('#register-user').on('submit', this.register)
}

UserAccount.prototype.register = function(e) {
  e.preventDefault()
  
  var userData = {
    user : {
      first_name: $('#registration-form input[name=first_name]').val(),
      last_name: $('#registration-form input[name=last_name]').val(),
      email: $('#registration-form input[name=email]').val(),
      password: $('#registration-form input[name=password]').val(),
      password_confirmation: $('#registration-form input[name=password_confirmation]').val()
    }
  }

  $.ajax({
     url: /users/,
     data: JSON.stringify(userData),
     dataType:'json',
     contentType: 'application/json',
     type:'POST',
     success: function(data) {
       debugger;
     },
     error: function(err) {
      debugger;
     }
  });
}

UserAccount.prototype.update = function(e) {
  e.preventDefault()
  
  var userData = {
    user : {
      first_name: $('#registration-form input[name=first_name]').val(),
      last_name: $('#registration-form input[name=last_name]').val(),
      email: $('#registration-form input[name=email]').val(),
      password: $('#registration-form input[name=password]').val(),
    }
  }

  $.ajax({
     url: /users/,
     data: JSON.stringify(userData),
     dataType:'json',
     contentType: 'application/json',
     type:'PATCH',
     success: function(data) {
       debugger;
     },
     error: function(err) {
      debugger;
     }
  });
}

UserAccount.prototype.delete = function(e) {
  e.preventDefault()

  $.ajax({
     url: /users/,
     data: '',
     dataType:'json',
     contentType: 'application/json',
     type:'DELETE',
     success: function(data) {
       debugger;
     },
     error: function(err) {
      debugger;
     }
  });
}

UserAccount.prototype.login = function(e) {
  e.preventDefault()
  
  var userData = {
    user : {
      email: $('#registration-form input[name=email]').val(),
      password: $('#registration-form input[name=password]').val(),
    }
  }

  $.ajax({
     url: 'users/sign_in',
     data: JSON.stringify(userData),
     dataType:'json',
     contentType: 'application/json',
     type:'POST',
     success: function(data) {
       debugger;
     },
     error: function(err) {
      debugger;
     }
  });
}

UserAccount.prototype.logout = function(e) {
  e.preventDefault()

  $.ajax({
     url: 'users/sign_out',
     data: '',
     dataType:'json',
     contentType: 'application/json',
     type:'DELETE',
     success: function(data) {
       debugger;
     },
     error: function(err) {
      debugger;
     }
  });
}

