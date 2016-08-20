var FlashMessage = function(message, hideDelay) {
  this.show(message)
  var timeoutId = window.setTimeout(this.hide, hideDelay)
}

FlashMessage.prototype.show = function(message) {
  $("#js-flash-message").html(message).removeClass("hidden")
}

FlashMessage.prototype.hide = function() {
  $("#js-flash-message").addClass("hidden");
}