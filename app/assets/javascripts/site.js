$(function() {
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

	var LAT;
	var LON;
	var MAP;

	$("#get-loc").bind("click", getLocation)

		
	function onError (error) {
		alert("Oops, we couldn't detect your location. ", error);
	}

	function onSuccess(position) {

		LAT = position.coords.latitude;
		LON = position.coords.longitude;
		var location = LAT+'|'+LON

		searchCoords(location);
		initialize(LAT,LON);
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
		putMarkers();
	}

	function showError () {
		alert('boo error');
	}


// ----------------- maps -----------------------


	function initialize(lat, lon) {

        var mapOptions = {
          center: { lat: lat, lng: lon },
          zoom: 8
        };

        MAP = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

    };

    function putMarkers() {

    	var markers = $(".markers").data("markers");

        for( i = 0; i < markers.length; i++ ) {

	        var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
	        // bounds.extend(position);
	        marker = new google.maps.Marker({
	            position: position,
	            map: MAP,
	            title: markers[i][2]
	        });

        };
    };

    $("#drop-markers").bind('click', putMarkers)

});



