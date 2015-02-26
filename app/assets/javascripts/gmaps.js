function initialize() {

	bounds = new google.maps.LatLngBounds();

  var mapOptions = {
    center: new google.maps.LatLng(41.38,2.18),
    zoom: 2,
    scrollwheel: false
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
};

var GmapOverlay = function() {
};

GmapOverlay.prototype.putMarkers = function(markers) {
  if (this.gmapMarkers === undefined) this.gmapMarkers = [];
  this.clearMarkers();
  this.bounds = new google.maps.LatLngBounds();
  this.infoWindowContent = [];

  for( i = 0; i < markers.length; i++ ) {

    var position = new google.maps.LatLng(markers[i]["lat"], markers[i]["lon"]);
    this.bounds.extend(position);

    var content = '<h3><a href="http://en.wikipedia.org/?curid=' + markers[i].id +'" target="_blank">' + markers[i].title + '</a></h3>' +
      '<input class="save-article btn '+ markers[i].id +' btn btn-default" type="button" value="Save"><br>' +
      '<iframe src="http://en.m.wikipedia.org/?curid=' + markers[i].id + '" width="400" height="300" frameborder="0"></iframe>'
    this.infoWindowContent.push(content);

    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i]["title"]
    });

    this.gmapMarkers.push(marker);
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    var self = this;

    google.maps.event.addListener(marker, 'click', (function(marker, i) { 
      return function() {
        infoWindow.setContent(self.infoWindowContent[i]);
        infoWindow.open(map, marker); 
        $(".save-article").on('click', self.selectArticle);
      };
    })(marker, i));  

    map.fitBounds(this.bounds);
  };
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    this.setZoom(15);
    google.maps.event.removeListener(boundsListener);
  });
};

GmapOverlay.prototype.clearMarkers = function() {
    for (var i = 0; i < this.gmapMarkers.length; i++ ) {
    this.gmapMarkers[i].setMap(null);
  };
  this.gmapMarkers = [];
};

GmapOverlay.prototype.selectArticle = function(event) {
  // var articleID = this.id;
  userArticleList.addArticle(event);
};

