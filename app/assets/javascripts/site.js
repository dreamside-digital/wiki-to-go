$(function() {
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

	$("#get-loc").bind("click", getLocation)

		
	function onError (error) {
		alert("Oops, we couldn't detect your location. ", error);
	}

	function onSuccess(position) {

		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var location = lat+'|'+lon

		searchCoords(location);
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
	}

	function showError () {
		alert('boo error');
	}


});



