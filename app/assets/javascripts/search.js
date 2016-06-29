var Search = function () {
  var lat, lon, markers;
  this.addListeners();
};

Search.prototype.getCurrentLocation = function (e) {
  e.preventDefault()
  var geolocationError = function(error) {
    new FlashMessage("We couldn't detect your location. Please make sure geolocation is enabled and try again.", 4000)
    setup.reset()
  }

  var geolocationSuccess = function(position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.preSearch(this.lat, this.lon);
    this.startSearch(this.lat, this.lon);
  }

  $(".map-loader").addClass("circles-loader");
  $('.title-area').hide();

  if (!navigator.geolocation) {
    new FlashMessage("Geolocation is not available on your device. You can type in your location and search that way.", 5000)
    setup.reset()
  }
    
  var options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 60000
  };

  navigator.geolocation.getCurrentPosition(geolocationSuccess.bind(this), geolocationError.bind(this), options);
};


Search.prototype.getCoordsFromAddress = function(e) {
  event.preventDefault();
  $(".map-loader").addClass("circles-loader");
  $('.title-area').hide();
  var query = $(event.currentTarget).find("input")[1].value
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address' : query}, function(response, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var lat = response[0].geometry.location.lat();
      var lon = response[0].geometry.location.lng();
      window.userSearch.preSearch(lat, lon);
      window.userSearch.startSearch(lat, lon);
    } else {
      new FlashMessage("Sorry, there was an error with your search: " + status, 4000)
      setup.reset()
    }
  });
}

Search.prototype.preSearch = function(lat, lon) {
}

Search.prototype.startSearch = function(lat, lon) {
  window.mapOverlay = new MapOverlay();
  window.mapOverlay.repositionMap(lat, lon);
  window.mapOverlay.placeUserMarker(lat, lon);

  var location = lat+'|'+lon;

  $.ajax( {
     url: /search/,
     data: { 'location' : location },
     dataType:'json',
     type:'GET',
     success: function(data) {
       if (data.status == "success") {
         window.searchResults = new Results(data.results)
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