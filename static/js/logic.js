var mymap = L.map('map', {
    center: [37.7749, -122.41914], 
    zoom: 13
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.emerald',
    accessToken: API_KEY
}).addTo(mymap);

var link = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";

d3.json(link, function(response){
    
    //console.log(response);
    var markers = L.markerClusterGroup();
    
    for (var i=0; i<response.length; i++) {
        var location = response[i].location;
        console.log(response[i]);
        if (location) {
            markers.addLayer(L.marker([location.coordinates[1],
             location.coordinates[0]])
                .bindPopup([response[i].descript, response[i].date].join(' ')));
               
        }
    }
     mymap.addLayer(markers);
 });