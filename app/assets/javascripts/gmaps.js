function initialize() {

	bounds = new google.maps.LatLngBounds();
  var styles = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#0066ff"
            },
            {
                "saturation": 74
            },
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "weight": 0.6
            },
            {
                "saturation": -85
            },
            {
                "lightness": 61
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#5f94ff"
            },
            {
                "lightness": 26
            },
            {
                "gamma": 5.86
            }
        ]
    }
]

  var mapOptions = {
    center: new google.maps.LatLng(41.38,2.18),
    zoom: 5,
    scrollwheel: false
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  map.setOptions({styles: styles});

};

function repositionMap (lat,lon) {
    var newPosition = new google.maps.LatLng(lat,lon)
    map.setCenter(newPosition);
    map.setZoom(15);
}

function putUserMarker (lat, lon) {

  var position = new google.maps.LatLng(lat,lon)
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: "You are here!",
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|FF1200|000000'
    });
}

var GmapOverlay = function() {
};

GmapOverlay.prototype.putMarkers = function(markers) {
  if (this.gmapMarkers === undefined) this.gmapMarkers = [];
  this.clearMarkers();
  this.bounds = new google.maps.LatLngBounds();
  this.infoWindowContent = [];

  for( i = 0; i < markers.length; i++ ) {

    var position = new google.maps.LatLng(markers[i]["lat"], markers[i]["lon"]);

    var content = 
      '<input class="save-article btn '+ markers[i].id +' btn btn-default" type="button" value="Save"><br>' +
      '<h4><a href="http://en.wikipedia.org/?curid=' + markers[i].id +'" target="_blank">' + markers[i].title + '</a></h4>' +
      '<iframe src="http://en.m.wikipedia.org/?curid=' + markers[i].id + '" width="440px" frameborder="0"></iframe>'
    this.infoWindowContent.push(content);

    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i]["title"],
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|FF960E|000000'
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
  };

  var dragendListener = google.maps.event.addListener(map, 'dragend', function() {
    var newCenter = map.getCenter();
    var lat = newCenter.k
    var lon = newCenter.D
    var location = lat + '|' + lon;
    userSearch.searchCoords(location);
    google.maps.event.removeListener(dragendListener);
  });
};

GmapOverlay.prototype.clearMarkers = function() {
    for (var i = 0; i < this.gmapMarkers.length; i++ ) {
    this.gmapMarkers[i].setMap(null);
  };
  this.gmapMarkers = [];
};

GmapOverlay.prototype.selectArticle = function(event) {
  userArticleList.addArticle(event);
};

