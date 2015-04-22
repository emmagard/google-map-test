var locations = [];

// use jQuery to get data
//push specific data points to locations array
$.get("https://data.cityofboston.gov/resource/7cdf-6fgx.json?year=2014", function(data){
    for(var i = 0; i < data.length; i++){
        locations.push(new google.maps.LatLng(data[i].location.latitude, data[i].location.longitude));
    }
    console.log(locations);
});

var map, pointarray, heatmap;

function initialize() {
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(42.360082, -71.05888),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var pointArray = new google.maps.MVCArray(locations);

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });

    heatmap.setMap(map);

    setMarkers(map, placePoints);

}// initialize end

// toggle heat map on and off
function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}
var placePoints=[
        ["Somerville", 42.387597, -71.099497],
        ["Boston", 42.360082, -71.05888]
    ];

function setMarkers(map, locations){
    for (var i = 0; i < locations.length; i++) {
        var place = locations[i];
        var myLatLng = new google.maps.LatLng(place[1], place[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: place[0]
        });

    }

}

google.maps.event.addDomListener(window, 'load', initialize);






