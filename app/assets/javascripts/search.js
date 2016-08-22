class Search {

  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
}



Search.prototype.preSearch = function(lat, lon) {
  window.mapOverlay = new MapOverlay();
  window.mapOverlay.repositionMap(lat, lon);
  window.mapOverlay.placeUserMarker(lat, lon);
}

Search.prototype.startSearch = function(lat, lon, limit=50) {

  var location = lat+'|'+lon;

  $.ajax( {
     url: /search/,
     data: { 'location' : location, 'limit' : limit },
     dataType:'json',
     type:'GET',
     success: function(data) {
       if (data.status == "success") {
         window.searchResults = new Results(data.results, window.mapOverlay)
         window.searchResults.showResults()
       } else {
        new FlashMessage("We were unable to get any results. Please try again", 4000)
        setup.reset()
       }
     }.bind(this),
     error: function() {
      new FlashMessage("We were unable to get any results. Please try again", 4000)
      setup.reset()
     }
  } );
};

Search.prototype.addListeners = function () {
  $("#get-loc, #get-loc-dropdown").on("click", this.getCurrentLocation.bind(this));
  $("#search, #search-dropdown").on("submit", this.getCoordsFromAddress.bind(this));
};