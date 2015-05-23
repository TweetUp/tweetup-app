var tweetup  = {

  initialize: function() {
    // general map options
    var options = {
          zoom: 8,
          center: new google.maps.LatLng(53.563032, 9.930034)
        }, markers, twitterCoordinates, heatmap;

    this.map = new google.maps.Map($("#map-canvas")[0], options);

    $.ajax({
      url: "/tweets"
    }).done(function(response) {
      markers = response;

      twitterCoordinates = this.createCoordinates(markers);
      this.placeMarkers(twitterCoordinates);

      heatmap = new google.maps.visualization.HeatmapLayer({
        data: twitterCoordinates
      });

      heatmap.setMap(this.map);

      $("#filter a").on("click", tweetup.filter);
    }.bind(this));
  },

  createCoordinates: function(twitterData) {
    var mapCoordinates = [];
    for (var i=0; i<twitterData.length; i++) {
      mapCoordinates[i] = {
        lat: twitterData[i].lat,
        lon: twitterData[i].lon,
        text: twitterData[i].text,
        imageUrl: twitterData[i].image_url
      };
        // new google.maps.LatLng(
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
      position: new google.maps.LatLng(coordinates.lat, coordinates.lon),
      map: this.map,
      animation: google.maps.Animation.DROP,
      text: coordinates.text,
      imageUrl: coordinates.imageUrl
    });

    google.maps.event.addListener(marker, 'click', function() {
      var imageUrl = marker.imageUrl,
          text = marker.text;
      $("#info-box span").html(text);
      $("#info-box img").attr("src", imageUrl);
      $("#info-box").show();
    });
  },

  placeMarkers: function(allMarkers) {
    for (var i=0; i<allMarkers.length; i++) {
      this.addMarker(allMarkers[i]);
    }
  },

  filter: function(event) {
    var filter = $(event.currentTarget),
        filterId = filter.data();
    filter.toggleClass("disabled");

    event.preventDefault();
  }
};

window.onload = tweetup.loadScript();

