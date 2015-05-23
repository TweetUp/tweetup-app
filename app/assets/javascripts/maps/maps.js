var tweetup  = {

  initialize: function() {
    // general map options
    var options = {
          zoom: 8,
          center: new google.maps.LatLng(53.563032, 9.930034)
        };

    this.map = new google.maps.Map($("#map-canvas")[0], options);

    // var script2 = document.createElement('script');
    // script2.type = 'text/javascript'; 
    // script2.src = "https://maps.googleapis.com/maps/api/js" + '?key=AIzaSyB1ZZktWMg-Aiihtzmno8SNV_HPKj1yCHY' +  "&libraries=visualization&sensor=true_or_false";
    // document.body.appendChild(script2);
    
    var markers = [
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          { lat: 53.550846, lng: 9.930549, id: 0},
          {lat: 53.575519, lng: 10.008655, id: 1},
          {lat: 53.575519, lng: 10.008655, id: 1}
        ];

    var twitterCoordinates = this.createCoordinates(markers);
    this.placeMarkers(twitterCoordinates);
    
    var heatmap = new google.maps.visualization.HeatmapLayer({
    data: twitterCoordinates
    });

    heatmap.setMap(this.map);

  },

  createCoordinates: function(twitterData) {
    var mapCoordinates = [];
    for (var i=0; i<twitterData.length; i++) {
      mapCoordinates[i] = new google.maps.LatLng(twitterData[i].lat, twitterData[i].lng);
    }
    return mapCoordinates;
  },

  loadScript: function() {
    var script1 = document.createElement('script');

    script1.type = 'text/javascript';
    script1.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '?key=AIzaSyB1ZZktWMg-Aiihtzmno8SNV_HPKj1yCHY' +
        '&signed_in=true&callback=tweetup.initialize' + "&libraries=visualization&sensor=true_or_false";
    document.body.appendChild(script1);
    
  },

  addMarker: function(coordinates) {
    var marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: 'Hello World!',
      id: coordinates.id
    });

    google.maps.event.addListener(marker, 'click', function() {
      $("#info-box span").html("lat: " + marker.position.A + " lon: " + marker.position.F + " id: " + marker.id );
      $("#info-box").show();
    });
  },

  placeMarkers: function(allMarkers) {
    for (var i=0; i<allMarkers.length; i++) {
      this.addMarker(allMarkers[i]);
    }
  }
};

window.onload = tweetup.loadScript();

