$(function() {
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

	var lat;
	var lon;
	var map;

	$("#get-loc").bind("click", getLocation)

		
	function onError (error) {
		alert("Oops, we couldn't detect your location. ", error);
	}

	function onSuccess(position) {

		lat = position.coords.latitude;
		lon = position.coords.longitude;
		var location = lat+'|'+lon

		searchCoords(location);
		initialize(lat,lon);
	}

	function searchCoords(location) {

		var userLoc = { 'location' : location }

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
		console.log(markers)
		putMarkers(markers);
	}

	function showError () {
		alert('boo error');
	}


// ----------------- maps -----------------------


	function initialize(lat, lon) {

        var mapOptions = {
          center: { lat: lat, lng: lon },
          zoom: 12
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };

    function putMarkers(markers) {

        for( i = 0; i < 10; i++ ) {

	        var position = new google.maps.LatLng(markers[i]["lat"], markers[i]["lon"]);
	        // bounds.extend(position);
	        marker = new google.maps.Marker({
	            position: position,
	            map: map,
	            title: markers[i]["title"]
	        });

        };
    };


});



