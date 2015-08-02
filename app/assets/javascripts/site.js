$(function() {

  google.maps.event.addDomListener(window, 'load', initialize);

    
  function showMenu(e) {
    e.preventDefault();
    $('.search-area').slideToggle('slow');
    $('.show-search-btn').hide();
    $('.hide-search-btn').show();
  }

  function hideMenu(e) {
    e.preventDefault();
    $('.search-area').slideToggle('slow');
    $('.hide-search-btn').hide();
    $('.show-search-btn').show();
  }

  var GetSearchData = function () {
    this.addWikiListeners();
  };

	GetSearchData.prototype.getLocation = function () {
		if (!navigator.geolocation) throw new Error("Geolocation is not available, just type your location into the search bar instead!");
			
		var options = {
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 60000
		};

		navigator.geolocation.getCurrentPosition(this.geolocateSuccess.bind(this),
                                             this.geolocateError.bind(this),
                                             options);
	};

	GetSearchData.prototype.addWikiListeners = function () {
    $("#get-loc").on("click", this.getLocation.bind(this));
    		$("#search-query").on("submit", function(event) {
			event.preventDefault();
			query = ($('#search-query').val());
			this.searchAddress(query);
		}.bind(this));
    $("#get-loc").on("click", hideMenu);
    $("#get-loc").on("click", function() {
      $('.title-area').remove(); 
      $('.show-search-btn').removeClass('bounce'); 
    });
    $("#search").on("submit", hideMenu);
    $("#search").on("submit", function() {
      $('.title-area').remove();  
      $('.show-search-btn').removeClass('bounce');
    });
	};

  GetSearchData.prototype.searchAddress = function(query) {
    var self = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address' : query}, function(response, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = response[0].geometry.location.lat();
        var lon = response[0].geometry.location.lng();
        var location = lat +'|'+ lon;
        userSearch.searchCoords(location);
        repositionMap(lat,lon);
      } else {
        alert("Sorry, there was an error with your search: " + status);
      }
    });
  }

  GetSearchData.prototype.searchCoords = function(location) {

    var userLoc = { 'location' : location };

    $.ajax( {
       url: /search/,
       data: userLoc,
       dataType:'html',
       type:'GET',
       headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
       success: function(data) {
         this.showResults(data);
       }.bind(this),
       error: this.showError
    } );
  };

  GetSearchData.prototype.showResults = function(data) { 
    $(".map-area").removeClass("map-area-intro");
    $(".map-area").addClass("col-md-9");
    $(".cover").css({ "border-bottom": "5px solid #147363" })
    $("#results").html(data);
    this.markers = $(".results").data("results");
    mapOverlay.putMarkers(this.markers);
    userArticleList.showList(this.markers);
    userArticleList.listeners();
  };

  GetSearchData.prototype.showError = function() {
    alert('boo error');
  };

  GetSearchData.prototype.geolocateSuccess = function(position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    var location = this.lat+'|'+this.lon;
    this.searchCoords(location);
    repositionMap(this.lat, this.lon);
    putUserMarker(this.lat, this.lon);
  };

  GetSearchData.prototype.geolocateError = function(error) {
    alert("Oops, we couldn't detect your location. ", error);
  };

  userSearch = new GetSearchData();
  window.mapOverlay = new GmapOverlay(this.markers);

});


