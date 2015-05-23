var tweetup  = {

  initialize: function() {
    // general map options
    var options = {
          zoom: 10,
          center: new google.maps.LatLng(53.563032, 9.930034)
        },
        markers = [{ lat: 53.550846, lng: 9.930549}, {lat: 53.575519, lng: 10.008655}];

    this.map = new google.maps.Map($("#map-canvas")[0], options);
    this.placeMarkers(markers);
  },

  loadScript: function() {
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '?key=AIzaSyB1ZZktWMg-Aiihtzmno8SNV_HPKj1yCHY' +
        '&signed_in=true&callback=tweetup.initialize';
    document.body.appendChild(script);
  },

  addMarker: function(coordinates) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(coordinates.lat, coordinates.lng),
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: 'Hello World!'
    });
  },

  placeMarkers: function(markers) {
    for (var i=0; i<markers.length; i++) {
      this.addMarker(markers[i]);
    }
  }
};

window.onload = tweetup.loadScript();