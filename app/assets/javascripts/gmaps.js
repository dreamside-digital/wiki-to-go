
	function initialize() {

		bounds = new google.maps.LatLngBounds();

    var mapOptions = {
      center: new google.maps.LatLng(41.38,2.18),
      zoom: 2,
      scrollwheel: false
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  };


  function putMarkers(markers) {

    var gmapMarkers = [];

    clearMarkers(gmapMarkers);

    var bounds = new google.maps.LatLngBounds();

    var infoWindowContent = [];

    for( i = 0; i < markers.length; i++ ) {

      var position = new google.maps.LatLng(markers[i]["lat"], markers[i]["lon"]);
      bounds.extend(position);

      var content = '<h3><a href="http://en.wikipedia.org/?curid=' + markers[i].id +'" target="_blank">' + markers[i].title + '</a></h3>' +
      	'<input class="save-article btn btn-default" type="button" value="Save" id="'+ markers[i].id +'"><br>' +
      	'<iframe src="http://en.m.wikipedia.org/?curid=' + markers[i].id + '" width="400" height="300" frameborder="0"></iframe>'
      infoWindowContent.push(content);

      marker = new google.maps.Marker({
          position: position,
          map: map,
          title: markers[i]["title"]
      });

      gmapMarkers.push(marker);

      var infoWindow = new google.maps.InfoWindow(), marker, i;


      google.maps.event.addListener(marker, 'click', (function(marker, i) { 
        return function() {
          infoWindow.setContent(infoWindowContent[i]);
          infoWindow.open(map, marker); 
          $(".save-article").on('click', selectArticle);
        };
      })(marker, i));  

      map.fitBounds(bounds);
    };

    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
      this.setZoom(15);
      google.maps.event.removeListener(boundsListener);
    });

	};

	function clearMarkers(gmapMarkers) {
	  for (var i = 0; i < gmapMarkers.length; i++ ) {
      gmapMarkers[i].setMap(null);
	  };
    gmapMarkers = [];
	};

  function selectArticle() {
    selectedArticles.push(markers[i]["id"]);
    console.log(selectedArticles);
    $('#selected-results ul').append('<li>' + markers[i]["title"] + '</li>');
  };