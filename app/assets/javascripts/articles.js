// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var UserSelectedArticles = function(results) {
  this.results = results;
  this.selectedArticles = [];
  $('#make-book').on('click', this.makeBook.bind(this));
}

UserSelectedArticles.prototype.addArticle = function(articleID) {
  var article = this.results.filter(function(element) { 
    return element["id"] == articleID;
  })[0];
  $("#selected-results").append('<li>' + article.title + '</li>');
  this.selectedArticles.push(article);
};

UserSelectedArticles.prototype.makeBook = function() {
  var url = '/users/'+ UserId + '/books';
  var bookTitle = $('#book-title').val();
  var bookData = {
    book: {
      title: bookTitle,
      articles: this.selectedArticles,
    }
  };

  $.ajax( {
    url: url,
    data: bookData,
    type: 'POST',
    success: function() {
      console.log("success!");
    },
    error: function() {
      console.log("faillll")
    }
  } );

}