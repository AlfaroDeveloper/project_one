console.log("This app rocks");


function initMap() {
    var chicago = new google.maps.LatLng(41.850, -87.650);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        zoom: 3
    });
    var coordInfoWindow = new google.maps.InfoWindow();
    coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
    coordInfoWindow.setPosition(chicago);
    coordInfoWindow.open(map);
    map.addListener('zoom_changed', function () {
        coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
        coordInfoWindow.open(map);
    });
}
var TILE_SIZE = 256;
function createInfoWindowContent(latLng, zoom) {
    var scale = 1 << zoom;
    var worldCoordinate = project(latLng);
    var pixelCoordinate = new google.maps.Point(
        Math.floor(worldCoordinate.x * scale),
        Math.floor(worldCoordinate.y * scale));
    var tileCoordinate = new google.maps.Point(
        Math.floor(worldCoordinate.x * scale / TILE_SIZE),
        Math.floor(worldCoordinate.y * scale / TILE_SIZE));
    return [
        'Chicago, IL',
        'LatLng: ' + latLng,
        'Zoom level: ' + zoom,
        'World Coordinate: ' + worldCoordinate,
        'Pixel Coordinate: ' + pixelCoordinate,
        'Tile Coordinate: ' + tileCoordinate
    ].join('<br>');
}
// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
    var siny = Math.sin(latLng.lat() * Math.PI / 180);
    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
    return new google.maps.Point(
        TILE_SIZE * (0.5 + latLng.lng() / 360),
        TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}

var queryURL = "https://www.worldtides.info/api?extremes&lat=33.768321&lon=-118.195617&key=3829b936-6058-47fd-89e8-5853c311d142";
$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (response) {
        console.log(response.extremes);
        hiLow(response.extremes);
    });



  

function hiLow(data) {

    var body = document.getElementsByTagName("body")[0];
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    for (let i = 0; i < data.length; i++) {
        var row = document.createElement("tr");

        for (let j = 0; j < data.length; j++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode("cell in row " + i + ", column" + j);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");

    }
    console.log(hiLow);

    // hiLow();