// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var UserSelectedArticles = function() {
  resultsList = [];
  selectedArticles = [];
};

UserSelectedArticles.prototype.listeners = function() {
  $("body").off("click").on('click', ".save-article", this.addArticle.bind(this));
  $("body").on("click", ".save-article", this.changeMarkerColour.bind(this));
  $("body").on("click", ".show-preview", function(e) {
    var pageid = $(e.currentTarget).data("pageid")
    var gmapMarker = window.mapOverlay.gmapMarkers.filter(function(element) {
      return element.metadata.id == pageid
    })[0]
    previewWindow.getWikiPreview(gmapMarker)
  })
};

UserSelectedArticles.prototype.changeMarkerColour = function(e) {
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
};

UserSelectedArticles.prototype.resetMarkerColour = function(e) {

}

UserSelectedArticles.prototype.showList = function(results) {
  resultsList = results;
  $("#intro-text").show();
  var self = this;
  $('#make-book').unbind('submit').bind('submit', function(event) {
    event.preventDefault();
    self.makeBook();
  });
};

UserSelectedArticles.prototype.addArticle = function(event) {

  if (window.UserId != undefined) {
    
    var articleID = event.currentTarget.id;

    if (!this.articleAlreadySelected(articleID)) {

      var article = resultsList.filter(function(element) { 
        return element["id"] == articleID;
      })[0];
      var newListItem = this.makeArticleListItem(article)
      selectedArticles.push(article);
      $('.current-collection ul').prepend(newListItem);
      $('#article-count').html("" + selectedArticles.length)
      $(event.currentTarget).closest('li').remove();

      if ($('.current-collection ul').find('#placeholder')) {
        $('#placeholder').hide()
        $('#save-articles-collection').show()
      }

    }
  };
};

UserSelectedArticles.prototype.makeArticleListItem = function(article) {
  var link = $("<span>", { class: "col-xs-11" })
              .append($("<a>", { href: "#", style: "font-size: 14px, color: #000", text: article.title }))
  var glyphicon = $("<span>", { class: "glyphicon glyphicon-remove col-xs-1", click: this.removeArticle })
  var listItem = $("<li>", { class: "selected-article row" }).data("articleID", article.id)
  return listItem.append(link).append(glyphicon)

}

UserSelectedArticles.prototype.articleAlreadySelected = function(articleID) {
  var existingArticle = _.find(selectedArticles, function(article) { 
    return article.id == articleID 
  })
  if (existingArticle) {
    return true
  } else {
    return false
  }
}

UserSelectedArticles.prototype.removeArticle = function(event) { 
  event.preventDefault();
  var articleID = $(event.currentTarget).closest(".selected-article").data("articleID")
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

  $('#article-count').html("" + selectedArticles.length)
  if (selectedArticles.length < 1) {
    $('#placeholder').show()
    $('#save-articles-collection').hide()
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
  var generateBookLink = function(url) {
    var $bookLink = $("<a>", { href: url, html: bookTitle })
    return $bookLink
  }

  $.ajax( {
    url: url,
    data: bookData,
    type: 'POST',
    success: function(data) {
      alert("Your personal wiki has been saved!");
      $("#selected-articles-list > h3").html(generateBookLink(data.book_path));
      newPersonalWiki = new Book();
    },
    error: function() {
      alert("Your personal wiki was not saved. Try again.")
    }
  } );

}

userArticleList = new UserSelectedArticles();