
var MapOverlay = function() {
};

MapOverlay.prototype.putMarkers = function(markers) {
  if (this.gmapMarkers === undefined) this.gmapMarkers = [];
  this.clearMarkers();
  this.bounds = new google.maps.LatLngBounds();
  this.previewInfoWindowContent = [];

  for( i = 0; i < markers.length; i++ ) {

    if (_.findWhere(selectedArticles, { id: markers[i].id }) == undefined) {    

      var position = new google.maps.LatLng(markers[i]["lat"], markers[i]["lon"]);
      var infoWindow = new google.maps.InfoWindow(), marker, i;
      var previewContent = 
      '<p>' + markers[i].title + '</p>';
      this.previewInfoWindowContent.push(previewContent);
      var self = this;

      marker = new StyledMarker({
        styleIcon: new StyledIcon(StyledIconTypes.MARKER, {color: 'FF960E'}),
        position: position,
        map: map,
        title: markers[i]["title"]
      });
      marker.metadata = { type: 'point', id: markers[i].id };  
      this.gmapMarkers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker) { 
        return function() {
          previewWindow.getWikiPreview(marker);
        };
      })(marker));

      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) { 
        return function() {
          infoWindow.setContent(self.previewInfoWindowContent[i]);
          infoWindow.open(map, marker); 
        };
      })(marker, i));
    };
  };

  var dragendListener = google.maps.event.addListener(map, 'dragend', function() {
    console.log("searching again")
    var newCenter = map.getCenter();
    var lat = newCenter.lat();
    var lon = newCenter.lng();
    window.userSearch.startSearch(lat, lon);
    google.maps.event.removeListener(dragendListener);
  });
};

MapOverlay.prototype.clearMarkers = function() {
  for (var i = 0; i < this.gmapMarkers.length; i++ ) {
    this.gmapMarkers[i].setMap(null);
  };
  this.gmapMarkers = [];
};


MapOverlay.prototype.repositionMap = function(lat, lon) {
  var newPosition = new google.maps.LatLng(lat,lon)
  map.setCenter(newPosition);
  map.setZoom(15);
}

MapOverlay.prototype.placeUserMarker = function(lat, lon) {
  var position = new google.maps.LatLng(lat,lon)
  marker = new StyledMarker({
    styleIcon: new StyledIcon(StyledIconTypes.MARKER, {color: 'FF1200'}),
    position: position,
    map: map,
    title: "You are here!"
  });
}
