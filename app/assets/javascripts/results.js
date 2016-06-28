var Results = function(results) {
  this.results = results
  window.userArticleList = new UserSelectedArticles();
}

Results.prototype.showResults = function() { 
  $(".map-area").removeClass("map-area-intro");
  $(".map-area").addClass("col-md-9 col-sm-9 col-xs-12");
  $("#info-preview").show();
  $(".navbar-secondary").show();
  $(".search-area").hide();
  $(".map-loader").removeClass("circles-loader");
  $('#search-menu').show();
  window.mapOverlay.putMarkers(this.results);
  this.generateListView();
};

Results.prototype.generateListView = function() {
  
}