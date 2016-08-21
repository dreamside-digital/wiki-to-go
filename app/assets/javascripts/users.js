var UserAccount = function() {}

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