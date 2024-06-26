const map = L.map('map'); 
// Initializes map

map.setView([51.505, -0.09], 13); 
// Sets initial coordinates and zoom level

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map); 
// Sets map data source and associates with map

let marker, circle, zoomed;

navigator.geolocation.watchPosition(success, error);

function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }
    // Removes any existing marker and circule (new ones about to be set)

    marker = L.marker([lat, lng]).addTo(map);
    //console.log(marker)

    circle = L.circle([lat, lng], { // [51.505, -0.09] // To place circle in a specific, different location
        color: 'green',
        fillColor: 'red',
        fillOpacity: 0.5,
        radius : 500 // in pixels
    }).addTo(map);
    //console.log(circle)

    // Adds marker to the map and a circle for accuracy radius

    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds()); 
    }
    // Set zoom to boundaries of accuracy circle

    map.setView([lat, lng], 16);
    // Set map focus to current user position

    isMarkerInsideCircle(marker, circle)
}

function isMarkerInsideCircle(marker, circle) {
    if (marker._latlng.distanceTo(circle._latlng) <= circle._mRadius) {
        console.log("Inside")
    } else {
        console.log("Outside")
    }
}

function error(err) {
    if (err.code === 1) {
        alert("Please allow geolocation access");
    } else {
        alert("Cannot get current location");
    }
}