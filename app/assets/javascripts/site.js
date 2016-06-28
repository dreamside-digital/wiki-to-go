var HomePageSetup = function() {

  var initializeMap = function() {

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

    window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    window.map.setOptions({styles: styles});

  };

  function toggleSearchArea(e) {
    e.preventDefault();
    $('.search-area').slideToggle('slow');
    return false
  }

  function toggleResultsView(e) { 
    e.preventDefault();
    $("#list-view-text").toggle();
    $("#map-view-text").toggle();
    $("#map-canvas").toggle();
    $("#results-list").toggle();
    return false
  }

  var addListeners = function() {
    $('body').on("#get-loc-dropdown, #search-dropdown, #show-search-btn, #hide-search-btn", "click", toggleSearchArea);
    $('body').on("#switch-results-view", "click", toggleResultsView);
  }

  return {
    addListeners: addListeners,
    initializeMap: initializeMap
  }
  
}

$(".site.index").ready(function() {
  init = new HomePageSetup()
  init.initializeMap()
  init.addListeners()

});


