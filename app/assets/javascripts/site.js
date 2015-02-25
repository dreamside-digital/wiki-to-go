$(function() {

  google.maps.event.addDomListener(window, 'load', initialize);
  global_variable = 10;
      // var query;
    // var lat;
    // var lon;
    // var map;
    // var marker;
   //  var selectedArticles = []

  var WikiToGo = function () {
    this.addWikiListeners();
  };

	WikiToGo.prototype.getLocation = function () {
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

	WikiToGo.prototype.addWikiListeners = function () {
		$("#get-loc").on("click", this.getLocation.bind(this));

		$("#search").on("submit", function(event) {
			event.preventDefault();
			query = ($('#query').val());
			this.searchQuery(query);
		}.bind(this));
	};

	WikiToGo.prototype.searchQuery = function(query) {
    var userQuery = { 'query' : query };

    $.ajax( {
      url: /search/,
      data: userQuery,
      dataType:'html',
      type:'GET',
      headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
      success: function(data) {
        this.showResults(data);
      }.bind(this),
      error: this.showError
    } );
  };

  WikiToGo.prototype.searchCoords = function() {

    var location = this.lat+'|'+this.lon;
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

  WikiToGo.prototype.showResults = function(data) {
    $("#results").html(data);
    this.markers = $(".results").data("results")
    putMarkers(this.markers);
  };

  WikiToGo.prototype.showError = function() {
    alert('boo error');
  };

  WikiToGo.prototype.geolocateSuccess = function(position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    // var location = this.lat+'|'+this.lon;

    this.searchCoords();
  };

  WikiToGo.prototype.geolocateError = function(error) {
    alert("Oops, we couldn't detect your location. ", error);
  };

	var wikiToGoInstance = new WikiToGo();

});


// this is without object

// 	function getLocation () {

// 		if (!navigator.geolocation) throw new Error("Geolocation is not available, just type your location into the search bar instead!");
			
// 		var options = {
// 			enableHighAccuracy: true,
// 			maximumAge: 30000,
// 			timeout: 60000
// 		};

// 		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

// 	};



// 	function onError (error) {
// 		alert("Oops, we couldn't detect your location. ", error);
// 	};

// 	function onSuccess(position) {

// 		lat = position.coords.latitude;
// 		lon = position.coords.longitude;
// 		var location = lat+'|'+lon

// 		searchCoords(location);
//     };

// 	function searchCoords(location) {

// 		var userLoc = { 'location' : location };

// 		$.ajax( {
// 		    url: /search/,
// 		    data: userLoc,
// 		    dataType:'html',
// 		    type:'GET',
// 		    headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
// 		    success: function(data) {
// 		    	showResults(data);
// 		    },
// 		    error: showError
// 		} );

// 	};

//     function searchQuery(query) {

// 	    var userQuery = { 'query' : query };

// 	    $.ajax( {
// 	        url: /search/,
// 	        data: userQuery,
// 	        dataType:'html',
// 	        type:'GET',
// 	        headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
// 	        success: function(data) {
// 	          showResults(data);
// 	        },
// 	        error: showError
// 	    } );
//     };

// 	function showResults (data) {
// 		$("#results").html(data);
// 		var markers = $(".results").data("results")
// 		putMarkers(markers);
// 	};

// 	function showError () {
// 		alert('boo error');
// 	};

// 	$("#get-loc").on("click", getLocation);

// 	$("#search").on("submit", function(event) {
// 		event.preventDefault();
// 		query = ($('#query').val());
// 		searchQuery(query);
// 	});
// });



