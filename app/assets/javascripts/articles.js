// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var UserSelectedArticles = function(results) {
  // this.results = results;
  resultsList = results;
  selectedArticles = [];
  $('#make-book').on('click', this.makeBook.bind(this));
  this.listeners();
};

UserSelectedArticles.prototype.listeners = function() {
  $('.glyphicon-plus').on('click', this.addArticle.bind(this));
}

UserSelectedArticles.prototype.showList = function() {
  $(".map-area").removeClass("map-area-intro");
  $(".map-area").removeClass("map-area-intro");
  $(".map-area").addClass("col-md-8");
  $(".user-selected-articles").show();
};

UserSelectedArticles.prototype.addArticle = function(event) {
  $("#intro-text").hide();
  $("#selected-articles-list").show();
  var articleID = event.currentTarget.classList[2]
  var article = resultsList.filter(function(element) { 
    return element["id"] == articleID;
  })[0];
  var newListItem = document.createElement("li");
  var newGlyphicon = document.createElement("span");
  var self = this

  newGlyphicon.setAttribute("class", "glyphicon glyphicon-remove");
  newGlyphicon.setAttribute("aria-hidden", "true");
  newGlyphicon.setAttribute("id", articleID);
  newGlyphicon.addEventListener('click', self.removeArticle);
  newListItem.innerHTML = article.title;
  $('#selected-results ul').append($(newListItem).append(newGlyphicon));
  selectedArticles.push(article);
};

UserSelectedArticles.prototype.removeArticle = function(event) { 
  var articleID = event.currentTarget.id;
  var article = resultsList.filter(function(element) { 
    return element["id"] == articleID;
  })[0];
  $(this).parent().remove();
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
      $("#selected-articles-list > h3").html(data);
      newPersonalWiki = new Book();
    },
    error: function() {
      alert("Your personal wiki was not saved. Try again.")
    }
  } );

}