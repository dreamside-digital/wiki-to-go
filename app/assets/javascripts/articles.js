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
  $("#intro-text").hide();
  $("#selected-articles-list").show();

  var article = resultsList.filter(function(element) { 
    return element["id"] == articleID;
  })[0];
  var newListItem = document.createElement("li");
  var newGlyphicon = document.createElement("span");

  newGlyphicon.setAttribute("class", "glyphicon glyphicon-remove");
  newGlyphicon.setAttribute("aria-hidden", "true");
  newGlyphicon.setAttribute("id", articleID);
  newGlyphicon.addEventListener('click', self.removeArticle);
  newListItem.innerHTML = article.title;
  newListItem.setAttribute("id", articleID);
  $('#selected-results').append($(newListItem).append(newGlyphicon));

  selectedArticles.push(article);
  // $("#selected-results").append('<li>' + article.title + '<span class="glyphicon glyphicon-remove" aria-hidden="true" id="' + articleID + '"></span></li>');
  // $('"#'+ articleID + '"').on('click', this.removeArticle)
};

UserSelectedArticles.prototype.removeArticle = function(event) {
  var articleID = event.currentTarget.id;
  var article = resultsList.filter(function(element) { 
    return element["id"] == articleID;
  })[0];
  $(this).remove();
  var index = selectedArticles.indexOf(article); 
  if (index > -1) {
      selectedArticles.splice(index, 1);
  } else {
    selectedArticles.pop();
  }
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
    success: function(data) {
      alert("Your personal wiki has been saved!");
      $("#selected-articles-list > h3").html(data)
    },
    error: function() {
      alert("Your personal wiki was not saved. Try again.")
    }
  } );

}