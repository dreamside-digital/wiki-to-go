// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var UserSelectedArticles = function(results) {
  // this.results = results;
  resultsList = results;
  selectedArticles = [];
  $('#make-book').on('click', this.makeBook.bind(this));
};

UserSelectedArticles.prototype.showList = function() {
  $(".map-area").removeClass("col-md-12");
  $(".map-area").addClass("col-md-8");
  $(".user-selected-articles").show();
};

UserSelectedArticles.prototype.addArticle = function(articleID) {
  var article = resultsList.filter(function(element) { 
    return element["id"] == articleID;
  })[0];
  $("#intro-text").hide();
  $("#selected-articles-list").show();
  $("#selected-results").append('<li>' + article.title + '<span class="glyphicon glyphicon-remove" aria-hidden="true" id="' + articleID + '"></span></li>');
  selectedArticles.push(article);
  debugger;
  $('.glyphicon-remove').on('click', this.removeArticle)
};

UserSelectedArticles.prototype.removeArticle = function(event) {
  debugger;
  var articleID = event.currentTarget.id;
  var article = resultsList.filter(function(element) { 
    return element["id"] == articleID;
  })[0];
  $("#selected-results li:last-child").remove();
  var index = selectedArticles.indexOf(article);
  selectedArticles.splice(index, 1);
};

UserSelectedArticles.prototype.makeBook = function() {
  
  var url = '/users/'+ UserId + '/books';
  var bookTitle = $('#book-title').val();
  var bookData = {
    book: {
      title: bookTitle,
      articles: selectedArticles,
    }
  };

  $.ajax( {
    url: url,
    data: bookData,
    type: 'POST',
    success: function() {
      alert("Your personal wiki has been saved!");
    },
    error: function() {
      alert("Your personal wiki was not saved. Try again.")
    }
  } );

}