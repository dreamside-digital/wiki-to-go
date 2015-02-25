function initialize() {

	bounds = new google.maps.LatLngBounds();

  var mapOptions = {
    center: new google.maps.LatLng(41.38,2.18),
    zoom: 2,
    scrollwheel: false
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
};

var GmapOverlay = function(markers) {
  this.markers = markers;
};

GmapOverlay.prototype.putMarkers = function() {
  this.gmapMarkers = [];
  this.clearMarkers(this.gmapMarkers);
  this.bounds = new google.maps.LatLngBounds();
  this.infoWindowContent = [];

  for( i = 0; i < this.markers.length; i++ ) {

    var position = new google.maps.LatLng(this.markers[i]["lat"], this.markers[i]["lon"]);
    this.bounds.extend(position);

    var content = '<h3><a href="http://en.wikipedia.org/?curid=' + this.markers[i].id +'" target="_blank">' + this.markers[i].title + '</a></h3>' +
      '<input class="save-article btn btn-default" type="button" value="Save" id="'+ this.markers[i].id +'"><br>' +
      '<iframe src="http://en.m.wikipedia.org/?curid=' + this.markers[i].id + '" width="400" height="300" frameborder="0"></iframe>'
    this.infoWindowContent.push(content);

    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: this.markers[i]["title"]
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

  this.boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    this.setZoom(15);
    google.maps.event.removeListener(this.boundsListener);
  });
};

GmapOverlay.prototype.clearMarkers = function(gmapMarkers) {
    for (var i = 0; i < gmapMarkers.length; i++ ) {
    gmapMarkers[i].setMap(null);
  };
  this.gmapMarkers = [];
};

GmapOverlay.prototype.selectArticle = function(event) {

  var pageid = { pageid: this.id }
  
  $.ajax( {
       url: /select/,
       data: pageid,
       dataType:'html',
       type:'GET',
       success: function(data) {
        console.log(data)
       },
       error: function(error) {
        console.log("Errrororooror!", error)
       }
    } );
};
