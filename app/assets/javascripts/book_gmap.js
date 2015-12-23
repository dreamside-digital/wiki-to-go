$(".books.show").ready(function() {

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

  function repositionMap (lat, lon) {
      var newPosition = new google.maps.LatLng(lat, lon)
      map.setCenter(newPosition);
      map.setZoom(17);
  };

  var GmapOverlay = function() {
    this.markers = $('#marker-data').data("markers");
  };

  GmapOverlay.prototype.putMarkers = function() {

    this.bounds = new google.maps.LatLngBounds();
    this.previewInfoWindowContent = [];
    var bookMapMarkers = this.markers;

    for( i = 0; i < bookMapMarkers.length; i++ ) {

      if (i == 1) {
        repositionMap(bookMapMarkers[i]["lat"], bookMapMarkers[i]["lon"])
      };
      var position = new google.maps.LatLng(bookMapMarkers[i]["lat"], bookMapMarkers[i]["lon"]);
      var infoWindow = new google.maps.InfoWindow(), marker, i;
      var previewContent = 
      '<p>' + bookMapMarkers[i].title + '</p>';
      this.previewInfoWindowContent.push(previewContent);
      var self = this;

      marker = new StyledMarker({
        styleIcon: new StyledIcon(StyledIconTypes.MARKER, {color: 'FF960E', text: "" + (i+1)}),
        position: position,
        map: map,
        title: bookMapMarkers[i]["title"],
      });
      marker.metadata = { type: 'point', id: bookMapMarkers[i].id };  

      google.maps.event.addListener(marker, 'click', (function(marker) { 
        return function() {
          self.openArticle(marker, self);
        };
      })(marker));

      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) { 
        return function() {
          infoWindow.setContent(self.previewInfoWindowContent[i]);
          infoWindow.open(map, marker); 
        };
      })(marker, i));
      this.bounds.extend(position);
    };

    map.fitBounds(this.bounds)
  };

  GmapOverlay.prototype.openArticle = function(marker, self) {
    var articleID = marker.metadata.id;
    var map = $('#map-canvas');
    var searchFor = 'a.' + articleID 
    var articleTitle = $(searchFor);
    $.smoothScroll({
      scrollElement: map,
      scrollTarget: articleTitle
    });
    return false;
  }

  window.bookMapOverlay = new GmapOverlay();
  window.bookMapOverlay.putMarkers();

});
