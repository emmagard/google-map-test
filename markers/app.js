function initialize(){

  var myLatlng = new google.maps.LatLng(42.387597, -71.099497);
  var myCity =  new google.maps.LatLng(42.360082, -71.05888);

  var mapOptions = {
    center: new google.maps.LatLng(42.360082, -71.05888),
    zoom: 8
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

  // var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: map,
  //     title: 'Hello World!'
  // });
  // var marker = new google.maps.Marker({
  //     position: myCity,
  //     map: map,
  //     title: 'Hello World!'
  // });

  setMarkers(map, places);
}

var places = [
  ["Boston", 42.387597, -71.099497],
  ["Somerville", 42.360082, -71.05888]
];

function setMarkers(map, locations){
for (var i = 0; i < locations.length; i++) {
    var place = locations[i];
    var myLatLng = new google.maps.LatLng(place[1], place[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: place[0],
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
