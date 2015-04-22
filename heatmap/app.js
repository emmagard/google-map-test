var map, pointarray, heatmap;
var locations = [];

// use jQuery to get data
//push specific data points to locations array

function initialize() {

    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(42.360082, -71.05888),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    $.ajax({
        type:"GET",
        dataType: "json",
        cache: false,
        url: "https://data.cityofboston.gov/resource/7cdf-6fgx.json?year=2014",
        success: function(data){
            for(var i = 0; i < data.length; i++){
                locations.push(new google.maps.LatLng(data[i].location.latitude, data[i].location.longitude));
            }

            console.log(locations);

            pointArray = new google.maps.MVCArray(locations);

            heatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray,
                maxIntensity: 5
            });

            heatmap.setMap(map);
        }
    });

    setMarkers(map, placePoints);

}//initialize end

//toggle heat map on and off
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
        var infowindow = new google.maps.InfoWindow({
            content: place[0]
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: place[0],
            infowindow: infowindow
        });
        google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(map,this);
        });

    }

}

google.maps.event.addDomListener(window, 'load', initialize);





