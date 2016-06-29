var Results = function(results, overlay) {
  this.results = results
  this.overlay = overlay
  window.selectedArticles = new UserSelectedArticles(results)
}

Results.prototype.showResults = function() { 
  $(".map-area").removeClass("map-area-intro");
  $(".map-area").addClass("col-md-9 col-sm-9 col-xs-12");
  $("#info-preview").show();
  $(".navbar-secondary").show();
  $(".search-area").hide();
  $(".map-loader").removeClass("circles-loader");
  $('#search-menu').show();
  this.overlay.putMarkers(this.results);
  this.generateListView();
};

Results.prototype.generateListView = function() {
  var resultsHeader = $('<div>', { class: "search-results-header" }).append($('<h3>').html("Your search results"))
  var resultsList = $('<ul>', { class: "list-unstyled search-results" })
  $("#results-list").append(resultsHeader).append(resultsList)

  for (var i = 0; i < this.results.length; i++) {
    var pageid = this.results[i]["id"]
    var articleUrl = "http://en.wikipedia.org/?curid=" + pageid
    var title = this.results[i]["title"]

    var listItem = $("<li>")
    var previewLink = $("<a>", { class: "show-preview", data: { pageid: pageid }, text: title })
    var articleLink = $("<a>", { class: "open-article", href: articleUrl, target: "_blank" })
    var glyphiconLink = $("<span>", { class: "glyphicon glyphicon-link"})
    var glyphiconStar = $("<span>", { class: "glyphicon glyphicon-star save-article", id: pageid })

    articleLink.append(glyphiconLink)
    listItem.html((previewLink).append(articleLink).append(glyphiconStar))
    resultsList.append(listItem)
  }
}