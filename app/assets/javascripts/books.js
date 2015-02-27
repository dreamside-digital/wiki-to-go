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

bookready = function() {
  var book1 = new Book();
  book1.showWikiExtract();
  book1.closeWikiExtract();
};

$(document).ready(bookready);
$(document).on('page:load', bookready);