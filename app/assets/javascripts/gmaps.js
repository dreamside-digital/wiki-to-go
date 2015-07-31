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

function repositionMap (lat,lon) {
    var newPosition = new google.maps.LatLng(lat,lon)
    map.setCenter(newPosition);
    map.setZoom(15);
}

function putUserMarker (lat, lon) {

  var position = new google.maps.LatLng(lat,lon)
    marker = new StyledMarker({
      styleIcon: new StyledIcon(StyledIconTypes.MARKER, {color: 'FF1200'}),
      position: position,
      map: map,
      title: "You are here!"
    });
}

var GmapOverlay = function() {
};

GmapOverlay.prototype.putMarkers = function(markers) {
  if (this.gmapMarkers === undefined) this.gmapMarkers = [];
  this.clearMarkers();
  this.bounds = new google.maps.LatLngBounds();
  this.infoWindowContent = [];
  this.previewInfoWindowContent = [];

  for( i = 0; i < markers.length; i++ ) {

    if (_.findWhere(selectedArticles, { id: markers[i].id }) == undefined) {    

      var position = new google.maps.LatLng(markers[i]["lat"], markers[i]["lon"]);

      var previewContent = 
      '<p>' + markers[i].title + '</p>';
      this.previewInfoWindowContent.push(previewContent);
      var mainContent = 
        '<input class="save-article btn '+ markers[i].id +' highlight-btn" type="button" value="Save"><br>' +
        '<h4><a href="https://en.wikipedia.org/?curid=' + markers[i].id +'" target="_blank">' + markers[i].title + '</a></h4>' +
        '<iframe src="https://en.m.wikipedia.org/?curid=' + markers[i].id + '" width="440px" height="250px" frameborder="0"></iframe>'
      this.infoWindowContent.push(mainContent);

      marker = new StyledMarker({
        styleIcon: new StyledIcon(StyledIconTypes.MARKER, {color: 'FF960E'}),
        position: position,
        map: map,
        title: markers[i]["title"]
      });
      marker.metadata = { type: 'point', id: markers[i].id };  
      this.gmapMarkers.push(marker);
      var infoWindow = new google.maps.InfoWindow(), marker, i;
      var self = this;

      google.maps.event.addListener(marker, 'click', (function(marker, i, position) { 
        return function() {
          self.getWikiPreview(markers[i], self);
          // infoWindow.setContent(self.infoWindowContent[i]);
          // infoWindow.open(map, marker); 
          // $(".save-article").on('click', self.selectArticle);
          // $(".save-article").on('click', function() {
          //   if (window.UserId != undefined) {
          //     marker.setMap(null);
          //     marker = new StyledMarker({
          //       styleIcon: new StyledIcon(StyledIconTypes.MARKER, {color: '147363'}),
          //       position: position,
          //       map: map,
          //       title: markers[i]["title"]
          //     });
          //   } else {
          //     alert("We can't save this article for you if you're not logged in!");
          //   };
          // });
        };
      })(marker, i, position));

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
    console.log(location);
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

GmapOverlay.prototype.getWikiPreview = function(marker, gmapOverlayObject) {

  console.log("let's get some info!");

  var url = '/results'
  var markerData = {
    articleID: marker.id
  }

  $.ajax( {
    url: url,
    data: markerData,
    type: 'GET',
    success: function(data){
      gmapOverlayObject.showWikiInfowindow(data, marker);
    },
    error: function(err) {
      console.log(err)
    }, 
    dataType: "json"
  } );
}

GmapOverlay.prototype.showWikiInfowindow = function(data, marker) {
  console.log("display preview");
  $("#info-preview h4").html(marker.title);
  $("#info-preview img").attr("src", data.image);
  $("#info-preview p").html(wordCount(data.preview, marker));

  function wordCount(text, marker) {
    if (text.length > 330) {
      var preview = text.slice(0, 330);
    } else {
      var preview = text;
    }
    return preview + "... <a href='https://en.wikipedia.org/?curid=" + marker.id + "'>Read more</a>"
  }
}
