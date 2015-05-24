var tweetup  = {

  initialize: function() {
    var lat = 53.556866,
        lon = 9.923450;

    if (navigator.geolocation) {
      var position = navigator.geolocation.getCurrentPosition(function (position) {
        if (position && position.coords) {
          lat = position.coords.latitude;
          lon = position.coords.longitude;
          this.showMap(lat, lon);
        } else {
          this.showMap(lat, lon);
        }
      }.bind(this));
    } else {
      this.showMap(lat, lon);
    }

  },

  createCoordinates: function(twitterData) {
    var mapCoordinates = [];
    for (var i=0; i<twitterData.length; i++) {
      mapCoordinates[i] = {
        lat: twitterData[i].lat,
        lon: twitterData[i].lon
      };
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

  addMarker: function(data, icon) {

    var marker = new google.maps.Marker({
      position:  new google.maps.LatLng(data.lat, data.lon),
      map:       this.map,
      animation: google.maps.Animation.DROP,
      text:      data.text,
      imageUrl:  data.image_url,
      icon: icon
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
    var myIcon = new google.maps.MarkerImage("marker2.png", null, null, null, new google.maps.Size(30,40));
    for (var i=0; i<allMarkers.length; i++) {
      this.addMarker(allMarkers[i], myIcon);
    }
  },

  filter: function(event) {
    var filter = $(event.currentTarget),
        filterId = filter.data();
    filter.toggleClass("disabled");

    event.preventDefault();
  },

  showMap: function(lat, lon) {
    var options = {
          zoom: 15,
          center: new google.maps.LatLng(lat, lon)
        },
        twitterData, twitterCoordinates, heatmap;

    this.map = new google.maps.Map($("#map-canvas")[0], options);

    // add marker
    $.ajax({
      url: "/tweets.json"
    }).done(function(response) {
      twitterData = response;

      twitterCoordinates = this.createCoordinates(twitterData);

      this.placeMarkers(response);

      heatmap = new google.maps.visualization.HeatmapLayer({
        data: twitterCoordinates
      });

      heatmap.setMap(this.map);

      $("#filter a").on("click", tweetup.filter);

      $.ajax({
        url: "/tweets"
      }).done(function(response) {
        // display the first 4 tweets
        $("#twitter-feed").html(response);
      });

    }.bind(this));

  }

};

window.onload = tweetup.loadScript();

