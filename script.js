// Step 1: Initialize the map centered on Mannar & Puttalam
var map = L.map('map').setView([8.9675, 79.9041], 8); // Latitude, Longitude, Zoom level

// Step 2: Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
// Load GeoJSON data
fetch('pipe_water.geojson')
  .then(response => response.json())
  .then(data => {
    const layer = L.geoJSON(data, {
      style: {
        color: "#0077be",
        weight: 2,
        fillColor: "#4fd1c5",
        fillOpacity: 0.5
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<strong>Scheme Name:</strong> " + feature.properties.SCH_NAME + "<br>" +
          "<strong>Coverage:</strong> " + feature.properties.COVER_PER + "%" + "<br>" +
          "<strong>Water Source:</strong> " + feature.properties.WATER_SOUR + "<br>" +
          "<strong>Supply Level:</strong> " + feature.properties.SUP_LEV
        );
      }
    }).addTo(map);

    // Zoom to your data layer
    map.fitBounds(layer.getBounds());
  });

// Load study boundary layer
fetch('study_boundary.geojson')
  .then(response => response.json())
  .then(boundary => {
    L.geoJSON(boundary, {
      style: {
        color: "#FF0000",      // Red boundary line
        weight: 3,
        fill: false
      }
    }).addTo(map);
  });


