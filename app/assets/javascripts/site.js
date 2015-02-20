$(function() {
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
	console.log("let's go!")
	getLocation();
		
	function onError (error) {
		console.log("Error getting geolocation. ", error);
	}

	function onSuccess(position) {

		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var location = lat+'|'+lon


		searchCoords(location);
	}

	function getLocation () {

		if (!navigator.geolocation) throw new Error("Geolocation is not available, just type your location into the search bar instead!")
			
			var options = {
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 60000

			};

	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

	};


	function searchCoords(location) {

		var userLoc = { 'location' : location }

		$.ajax( {
		    url: /coords/,
		    data: userLoc,
		    dataType:'html',
		    type:'POST',
		    headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
		    success: function(data) {
		    	console.log(data);
		    	showResults(data);
		    },
		    error: showError
		} );

	};

// var urlBuilder = function (query) {

// 	base = '/search/'
// 	radius = '&gsradius=' + radius*100

// 	url = base + query

// 	console.log(url);
// 	return url;

// }


// function pageSearchWiki(query) {

// 	var APIurl = '/search/'+ query;

	// $.ajax( {
	//     url: APIurl,
	//     data: "",
	//     dataType:'html',
	//     type:'GET',
	//     headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
	//     success: function(data) {
	//     	console.log(data);
	//     	showResults(data);
	//     },
	//     error: showError
	// } );



// }

	function showResults (data) {
		$("#results").html(data);
	}

	function showError () {
		alert('boo error');
	}

// $("#search").submit( function(e) {
// 	e.preventDefault();
// 	debugger;
// 	pageSearchWiki($('#query').val());
// });


});



