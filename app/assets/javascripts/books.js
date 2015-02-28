// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var Book = function () {
};

Book.prototype.showWikiExtract = function() {
  $('.btn-show-article').on('click', function(event) {
    console.log("yo");
    $(this).parent().find(".article-intro").slideToggle();
    $(this).hide();
    $(this).parent().find(".btn-hide-article").show();
  });
}

Book.prototype.closeWikiExtract = function () {
  $(".btn-hide-article").on('click', function(event) {
    $(this).parent().find(".article-intro").slideToggle();
    $(this).parent().find(".btn-show-article").show();
    $(this).hide();
  });
};

Book.prototype.deleteBook = function () {
  $(".glyphicon-remove").on('click', function () {
    var self = $(this)

    var bookId = $(this).parent().find('a').attr('class');
    var url = '/users/' + window.UserId + '/books/' + bookId  + '/';

    $.ajax( {
    url: url,
    data: {
      user_id: window.UserId,
      id: bookId
    },
    type: 'DELETE',
    success: function() {
      self.parent().parent().remove();
      console.log("deleted!!");
    },
    error: function() {
      alert("Your personal wiki was not deleted. Please refresh the page and try again.");
    }
  } );
  });
}

bookready = function() {
  var book1 = new Book();
  book1.showWikiExtract();
  book1.closeWikiExtract();
  book1.deleteBook();
};

$(document).ready(bookready);
$(document).on('page:load', bookready);
