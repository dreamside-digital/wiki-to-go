$(".site.index").ready(function() {

  function initialize() {

    bounds = new google.maps.LatLngBounds();
    var styles = [
      {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
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
                  "lightness": 80
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
                  "saturation": -81
              },
              {
                  "lightness": 41
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
                  "gamma": 2.6
              }
          ]
      }
  ]

    var mapOptions = {
      center: new google.maps.LatLng(41.38,2.18),
      zoom: 3,
      scrollwheel: false, 
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setOptions({styles: styles});

  };

  // google.maps.event.addDomListener(window, 'load', initialize);
  initialize();

});

  function repositionMap (lat,lon) {
      var newPosition = new google.maps.LatLng(lat,lon)
      map.setCenter(newPosition);
      map.setZoom(15);
  };

  function putUserMarker (lat, lon) {

    var position = new google.maps.LatLng(lat,lon)
      marker = new StyledMarker({
        styleIcon: new StyledIcon(StyledIconTypes.MARKER, {color: 'FF1200'}),
        position: position,
        map: map,
        title: "You are here!"
      });
  };

  var GmapOverlay = function() {
  };

  GmapOverlay.prototype.putMarkers = function(markers) {
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


