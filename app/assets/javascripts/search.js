var Search = function () {
  var lat, lon, markers;
  this.addListeners();
};

Search.prototype.getCurrentLocation = function () {

  var geolocationError = function(error) {
    alert("Oops, we couldn't detect your location. ", error);
  }

  var geolocationSuccess = function(position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.startSearch(this.lat, this.lon);
  }

  $(".map-loader").addClass("circles-loader");
  $('.title-area').remove();

  if (!navigator.geolocation) throw new Error("Geolocation is not available, you can type your location into the search bar instead!");
    
  var options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 60000
  };

  navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, options);
};


Search.prototype.getCoordsFromAddress = function(e) {
  event.preventDefault();
  $(".map-loader").addClass("circles-loader");
  $('.title-area').remove();
  var query = $(event.currentTarget).find("input")[1].value
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address' : query}, function(response, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var lat = response[0].geometry.location.lat();
      var lon = response[0].geometry.location.lng();
      window.userSearch.startSearch(lat, lon);
    } else {
      alert("Sorry, there was an error with your search: " + status);
    }
  });
}

Search.prototype.startSearch = function(lat, lon) {

  var location = lat+'|'+lon;
  var url = 'api.' + window.location.host + '/search'
  repositionMap(lat, lon);
  putUserMarker(lat, lon);

  $.ajax( {
     url: url,
     data: { 'location' : location },
     dataType:'json',
     type:'GET',
     success: function(data) {
       window.searchResults = new Results(data);
       window.searchResults.showResults()
     }.bind(this),
     error: this.showError
  } );
};

Search.prototype.showError = function() {
  alert('boo error');
};

Search.prototype.addListeners = function () {
  $('body').on("#get-loc, #get-loc-dropdown", "click", this.getCurrentLocation.bind(this));
  $('body').on("#search, #search-dropdown", "submit", this.getCoordsFromAddress.bind(this));
};

window.userSearch = new Search();