(function() {
    var mymap = L.map('mapid').setView([46.803010, -90.804323], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    // boat icon class
    var boatIconClass = L.Icon.extend({
            options: {
                iconSize:     [30, 30],
                iconAnchor:   [15, 15],
                popupAnchor:  [-3, -76]
            }
        }),

        // boat icon
        boatIcon = new boatIconClass({iconUrl: 'sailboat.png'}),

        // boat path
        boatPath = L.polyline([L.latLng(46.803010, -90.804323)]).addTo(mymap);


        boat = L.marker([46.803010, -90.804323], {
            icon: boatIcon
        }).addTo(mymap);

    _sail(mymap, boat, boatPath);

    function _sail(map, boat, path) {
        var currentCoords = boat.getLatLng(),
            currentPt = map.project(currentCoords),
            newPt = _getNewPoint(currentPt),
            newCoords = map.unproject(newPt),
            dist = L.GeometryUtil.distance(map, currentCoords, newCoords),
            duration = Math.pow(dist, 2),
            newBearingLine = _createBearingLine(currentCoords, newCoords),
            inter;

            // add new lat lng to boat path
            path.addLatLng(newCoords);

            // add new bearing line to map
            newBearingLine.addTo(map);

            console.log('current point', currentCoords);
            console.log('new point', newCoords);
            console.log('distance', dist);



            _moveBoat(map, boat, newBearingLine, dist);

        function _moveBoat(m, b, n, d) {
            console.log(m,b,n,d);
            var increment = 1/d,
                start = 0,
            // continue while distance is greater than zero
                inter = window.setInterval(function () {
                    start += increment;
                    var newPt = L.GeometryUtil.interpolateOnLine(m,n,start);
                        b.setLatLng(newPt.latLng);
                    if (start >= 1) {
                        inter.clearInterval();
                    }
                }, 100);
            // for(start <= d; start += increment;) {

            // }
            // inter.clearInterval();
        }

        function _createBearingLine(c, n) {
            return L.polyline([c,n],{
                color : '#FF0000',
                weight : 2,
                opacity : 1
            });
        }

        function _getNewPoint(cc) {
            cc.x += getRandomIntInclusive(-30,30);
            cc.y += getRandomIntInclusive(-30,30);
            return cc;

            // Returns a random integer between min (included) and max (included)
            // Using Math.round() will give you a non-uniform distribution!
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            function getRandomIntInclusive(min, max) {
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
    }  // end sail function
})();