// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var urlBuilder = function (query, radius) {

	base = 'http://en.wikipedia.org/w/api.php?action=query&list=geosearch$gslimit=500'
	radius = '&gsradius=' + radius*1000
	query = '&gspage=' + query

	url = base + radius + query

}


function pageSearchWiki(query, radius) {

	APIurl = urlBuilder(query, radius);

	$.ajax( {
	    url: APIurl,
	    data: "",
	    dataType:'json',
	    type:'POST',
	    headers: { 'Api-User-Agent': 'WikiToGo (sharon.peishan.kennedy@gmail.com)' }
	} );

}

