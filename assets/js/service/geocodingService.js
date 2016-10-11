// Load in which-polygon module for finding district from point
var whichPolygon = require("which-polygon");


var geocodingService = function() {
    this.getDistrict = function(address) {
        return Promise.resolve(
            getCoords(address)
            .then(getDistrict)
        );
    }

    this.getDistrictFromCoordinates = function(coords) {
        return Promise.resolve(getDistrict(coords));
    }

    this.getAddressFromCoordinates = function(address) {
        return Promise.resolve(getCoords(address));
    }
}

// Promise that loads in geojson and produces query function
var districtQuery = new Promise(function(resolve,reject) {
    $.getJSON( "http://data.coaplangis.opendata.arcgis.com/datasets/87db1a3385ef4ab1af86411efbe791bf_3.geojson", function( data ) {
        var query = whichPolygon(data);
        resolve(query);
    });
});

module.exports = geocodingService;


// ****** GEOCODING FUNCTIONS ******* //
// Function for getting district from coordinates;
function getDistrict(coords) {
    return Promise.resolve(
        districtQuery
        .then(function(query) {
            return query(coords).DISTRICT;
        })
    )
}

// Function for getting coordinates from an inputted address
function getCoords(address) {
    return new Promise(function(resolve,reject) {
        var mapboxAccessToken = "pk.eyJ1Ijoic2tva2VuZXMiLCJhIjoiMjA0ZjBhMmQxM2VlOTk4Nzg4ZGNkZTg4ZGEzMzVlMmIifQ.KLx_nUNkguWjPm6v176iVQ";
        var url = 'https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapboxAccessToken;

        $.get(url, function( data ) {
            // Return first entry for now; In future improve to return full list, with user clicking on correct address
            resolve(data.features[0].geometry.coordinates);
        });
    })
    
}