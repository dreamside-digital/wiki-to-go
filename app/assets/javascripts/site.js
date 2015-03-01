$(function() {

  google.maps.event.addDomListener(window, 'load', initialize);

  // $('.search-area').on('mouseenter', toggleMenu)
  $('.show-search-btn').on('click', showMenu);
  $('.hide-search-btn').on('click', hideMenu);

  // function toggleMenu () {
  //   $('.search-area').hide('slow');
  // }

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

		$("#search").on("submit", function(event) {
			event.preventDefault();
			query = ($('#query').val());
			this.searchAddress(query);
		}.bind(this));

    $("#get-loc").on("click", hideMenu);
    $("#search").on("submit", hideMenu);
	};

  GetSearchData.prototype.searchAddress = function(query) {
    var self = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address' : query}, function(response, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        debugger;
        var lat = response[0].geometry.location.k
        var lon = response[0].geometry.location.D
        var location = lat +'|'+ lon;
        userSearch.searchCoords(location);
      } else {
        console.log("error: " + status);
      }
    });
  }

	// GetSearchData.prototype.searchQuery = function(query) {
 //    var userQuery = { 'query' : query };

 //    $.ajax( {
 //      url: /search/,
 //      data: userQuery,
 //      dataType:'html',
 //      type:'GET',
 //      headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
 //      success: function(data) {
 //        this.showResults(data);
 //      }.bind(this),
 //      error: this.showError
 //    } );
 //  };

  GetSearchData.prototype.searchCoords = function(location) {

    // var location = this.lat+'|'+this.lon;
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
  };

  GetSearchData.prototype.geolocateError = function(error) {
    alert("Oops, we couldn't detect your location. ", error);
  };

  userSearch = new GetSearchData();
  var mapOverlay = new GmapOverlay(this.markers);

});


