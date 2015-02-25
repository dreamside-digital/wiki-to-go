	// function getLocation () {

	// 	if (!navigator.geolocation) throw new Error("Geolocation is not available, just type your location into the search bar instead!")
			
	// 		var options = {
	// 		enableHighAccuracy: true,
	// 		maximumAge: 30000,
	// 		timeout: 60000

	// 		};

	// navigator.geolocation.getCurrentPosition(onSuccess, onError, options);


	// function onError (error) {
	// 	alert("Oops, we couldn't detect your location. ", error);
	// }

	// function onSuccess(position) {

	// 	lat = position.coords.latitude;
	// 	lon = position.coords.longitude;
	// 	var location = lat+'|'+lon

	// 	searchCoords(location);
 //  }

	// function searchCoords(location) {

	// 	var userLoc = { 'location' : location };

	// 	$.ajax( {
	// 	    url: /search/,
	// 	    data: userLoc,
	// 	    dataType:'html',
	// 	    type:'GET',
	// 	    headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
	// 	    success: function(data) {
	// 	    	showResults(data);
	// 	    },
	// 	    error: showError
	// 	} );

	// };

 //  function searchQuery(query) {

 //    var userQuery = { 'query' : query };

 //    $.ajax( {
 //        url: /search/,
 //        data: userQuery,
 //        dataType:'html',
 //        type:'GET',
 //        headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' },
 //        success: function(data) {
 //          showResults(data);
 //        },
 //        error: showError
 //    } );
 //  }

	// };

	// function showResults (data) {
	// 	$("#results").html(data);
	// 	var markers = $(".results").data("results")
	// 	putMarkers(markers);
	// }

	// function showError () {
	// 	alert('boo error');
	// }