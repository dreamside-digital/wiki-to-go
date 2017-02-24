class GoogleGeocodeHelper {

  static geocodeAddress() {

  }

  $(".map-loader").addClass("circles-loader");
  $('.title-area').hide();
}
  event.preventDefault();
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

module.exports = GoogleGeocodeHelper;