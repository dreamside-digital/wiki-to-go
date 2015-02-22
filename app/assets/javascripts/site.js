$(function() {
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

	var LAT;
	var LON;
	var MAP;
	var MARKERS;

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
		console.log("helloooo");
		// putMarkers();
	}

	function showError () {
		alert('boo error');
	}


// ----------------- maps -----------------------


	function initialize(lat, lon) {

        var mapOptions = {
          center: { lat: LAT, lng: LON },
          zoom: 12
        };

        var map1 = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

		var position = new google.maps.LatLng(41.399555555556, 2.1521666666667)

        var marker = new google.maps.Marker({
	            position: position,
	            map: map1,
	            title: "Gràcia station"
	        });

    };

    // function putMarkers() {

    // 	var position = new google.maps.LatLng(41.399555555556, 2.1521666666667)

    // 	// MARKERS = $(".markers").data("markers");
    // 	// var MARKERS = $(".markers").data("markers");

    //     // for( i = 0; i < MARKERS.length; i++ ) {

	   //     //  var position = new google.maps.LatLng(MARKERS[i][0], MARKERS[i][1]);
	   //     //  // bounds.extend(position);
	   //      marker = new google.maps.Marker({
	   //          position: position,
	   //          map: map,
	   //          title: "Gràcia station"
	   //      });

    //     };
    // };

    // $("#drop-markers").bind('click', putMarkers)

});



