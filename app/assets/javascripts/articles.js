// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var UserSelectedArticles = function() {
  resultsList = [];
  selectedArticles = [];
};

UserSelectedArticles.prototype.listeners = function() {
  $('.glyphicon-plus').on('click', this.addArticle.bind(this));
  $("body").on('click', ".save-article", this.addArticle);
  $("body").on("click", ".save-article", function(e) {
    
    if (window.UserId != undefined) {

      var selectedMarker = _.find(mapOverlay.gmapMarkers, function(marker) {
        return marker.metadata.id == e.currentTarget.id;
      });

      selectedMarker.setMap(null);
      newMarker = new StyledMarker({
        styleIcon: new StyledIcon(StyledIconTypes.MARKER, {color: '147363'}),
        position: selectedMarker.position,
        map: map,
        title: selectedMarker.title
      });
    } else {
      alert("We can't save this article for you if you're not logged in!");
    };
  })

}

UserSelectedArticles.prototype.showList = function(results) {
  resultsList = results;
  $("#intro-text").show();
  $("#intro-text button").on('click', function() {
    $("#intro-text").remove();
  });
  var self = this
  $('#make-book').unbind('submit').bind('submit', function(event) {
    event.preventDefault();
    self.makeBook();
  });
};

UserSelectedArticles.prototype.addArticle = function(event) {
  if (window.UserId != undefined) {
    $(".user-selected-articles").show();
    
    var articleID = event.currentTarget.id;
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
  }
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

userArticleList = new UserSelectedArticles();