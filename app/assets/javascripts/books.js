// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var Book = function () {
  var li
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
    $(this).parent().parent().remove();

    var bookId = $(this).parent().find('a').attr('class');
    var url = '/users/' + window.UserId + '/books/' + bookId  + '/';

    $.ajax( {
    url: url,
    data: {
      user_id: window.UserId,
      id: bookId
    },
    type: 'DELETE',
    success: function (data) {
      console.log(data);
    },
    error: function() {
      alert("Your personal wiki was not deleted. It's yours forevaaaa!");
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

var deleteListItem = function(data) {
  li = document.getElementById(data);
  li.parentNode.removeChild(li);
  alert("congrats, you killed your book.");
}

$(document).ready(bookready);
$(document).on('page:load', bookready);
