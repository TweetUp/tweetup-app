var map;

function initialize() {
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(53.563032, 9.930034)
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  var markers = [{ lat: 53.550846, lng: 9.930549}, {lat: 53.575519, lng: 10.008655}];

  placeMarkers(markers);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '?key=AIzaSyB1ZZktWMg-Aiihtzmno8SNV_HPKj1yCHY' +
      '&signed_in=true&callback=initialize';
  document.body.appendChild(script);
}

function addMarker(coordinates) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(coordinates.lat, coordinates.lng),
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'Hello World!'
  });
}

function placeMarkers(markers) {
  for (var i=0; i<markers.length; i++) {
    addMarker(markers[i]);
  }
}

window.onload = loadScript;