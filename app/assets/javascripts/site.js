$(function() {
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

	var query;
	var lat;
	var lon;
	var map;
	var bounds;
	var marker;

	$("#get-loc").on("click", getLocation)

	$("form").on("submit", function(event) {
		event.preventDefault();
		query = ($('#query').val());
		searchQuery(query);
	})



		
	function onError (error) {
		alert("Oops, we couldn't detect your location. ", error);
	}

	function onSuccess(position) {

		lat = position.coords.latitude;
		lon = position.coords.longitude;
		var location = lat+'|'+lon

		searchCoords(location);
	}

	function searchQuery(query) {

		var userQuery = { 'query' : query };

		$.ajax( {
		    url: /search/,
		    data: userQuery,
		    dataType:'html',
		    type:'GET',
		    headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
		    success: function(data) {
		    	showResults(data);
		    },
		    error: showError
		} );
	}

	function searchCoords(location) {

		var userLoc = { 'location' : location };

		$.ajax( {
		    url: /search/,
		    data: userLoc,
		    dataType:'html',
		    type:'GET',
		    headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
		    success: function(data) {
		    	showResults(data);
		    },
		    error: showError
		} );

	};

	function getLocation () {

		if (!navigator.geolocation) throw new Error("Geolocation is not available, just type your location into the search bar instead!")
			
			var options = {
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 60000

			};

	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

	};

	function showResults (data) {
		$("#results").html(data);
		var markers = $(".markers").data("markers")
		putMarkers(markers);
	}

	function showError () {
		alert('boo error');
	}


// ----------------- maps -----------------------


	function initialize() {

		bounds = new google.maps.LatLngBounds();

        var mapOptions = {
          center: new google.maps.LatLng(41.38,2.18),
          zoom: 2
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };

    google.maps.event.addDomListener(window, 'load', initialize);

    function putMarkers(markers) {

        var infoWindowContent = [];

        for( i = 0; i < markers.length; i++ ) {

	        var position = new google.maps.LatLng(markers[i]["lat"], markers[i]["lon"]);
	        bounds.extend(position);

	        var link = '<a href="http://en.wikipedia.org/?curid=' + markers[i].id +'">' + markers[i].title + '</a>'
			infoWindowContent.push(link);

	        marker = new google.maps.Marker({
	            position: position,
	            map: map,
	            title: markers[i]["title"]
	        });

			var infoWindow = new google.maps.InfoWindow(), marker, i;

	        google.maps.event.addListener(marker, 'click', (function(marker, i) { 
      			return function() {
      				infoWindow.setContent(infoWindowContent[i]);
                	infoWindow.open(map, marker); 
      			};
		    })(marker, i));  

		    map.fitBounds(bounds);
        };

        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
	        this.setZoom(14);
	        google.maps.event.removeListener(boundsListener);
	    });

	};


});



