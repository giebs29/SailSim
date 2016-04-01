(function() {
    var mymap = L.map('mapid', {
        keyboard : false
    }).setView([46.811228, -90.811675], 17);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    // set up listeners
    document.addEventListener("keydown", _keydownHandler);

    // boat icon class
    var boatIconClass = L.Icon.extend({
            options: {
                iconSize:     [30, 30],
                iconAnchor:   [15, 30],
                popupAnchor:  [-3, -76]
            }
        }),

        // boat icon
        boatIcon = new boatIconClass({iconUrl: 'sailboat.png'}),

        // boat path
        boatPath = L.polyline([L.latLng(46.811228, -90.811675)]).addTo(mymap);


        boat = L.marker([46.811228, -90.811675], {
            icon: boatIcon
        }).addTo(mymap),
        heading = 0;



    ///////////////////////////////////////////////////////////
    // FUNCTIONS

    function _keydownHandler(evt) {
        // left
        if(evt.keyCode == 37) {
            heading = heading == 0 ? 360 : heading-1;
        }
        // right
        if(evt.keyCode == 39) {
            heading = heading == 360 ? 0 : heading+1;
        }
    }

    // Sail!!
    _sail(mymap, boat, boatPath, heading);
})();