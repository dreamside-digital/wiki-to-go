$(function() {

  google.maps.event.addDomListener(window, 'load', initialize);

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
			this.searchQuery(query);
		}.bind(this));
	};

	GetSearchData.prototype.searchQuery = function(query) {
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

  GetSearchData.prototype.searchCoords = function() {

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

  GetSearchData.prototype.showResults = function(data) {
    $("#results").html(data);
    this.markers = $(".results").data("results");
    mapOverlay.putMarkers(this.markers);
    userArticleList = new UserSelectedArticles(this.markers);
    userArticleList.showList();
  };

  GetSearchData.prototype.showError = function() {
    alert('boo error');
  };

  GetSearchData.prototype.geolocateSuccess = function(position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.searchCoords();
  };

  GetSearchData.prototype.geolocateError = function(error) {
    alert("Oops, we couldn't detect your location. ", error);
  };

  var newSearch = new GetSearchData();
  var mapOverlay = new GmapOverlay(this.markers);

});


