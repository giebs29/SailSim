// sail.js

var Sail = (function() {
    return function(map, boat, path) {

        var mod = {},
            // set interval of movement (ms)
            // also used in determining speed
            _timeInterval = 1000,
            // get time ratio
            _secRatio = _timeInterval/1000,
            // start heading at due north
            _heading = 0,
            // get weather conditions
            _weather = getWeather(boat.getLatLng().lat, boat.getLatLng().lng);

        // refresh weather every five seconds
        window.setTimeout(function() {
            _weather = getWeather(boat.getLatLng().lat, boat.getLatLng().lng);
        }, 5000);

                    // set up listeners
        document.addEventListener("keydown", function(evt) {
            _keydownHandler(evt, boat);
        }, true);

        // function that moves the boat
        mod.move = function() {
                // get current coords
            var currentCoords = boat.getLatLng(),
                // previous coords
                prevCoords = path.getLatLngs().pop(),
                // get actual wind angle
                windDegrees = _weather.current_observation.wind_degrees,
                // get bearing
                // bearing = L.GeometryUtil.bearing(prevCoords, currentCoords),
                // get previous distance traveled
                prevDist = L.GeometryUtil.distance(map, prevCoords, currentCoords),
                // get speed = distance over time = meters per second
                speed = (prevDist == 0 ? .1 : prevDist) * _secRatio,
                // get travel distance
                travelDist = _getDistance(_heading, _weather, speed, _timeInterval),
                newCoords = L.GeometryUtil.destination(currentCoords,_heading,travelDist),
                headingIndicator = document.getElementById('headingContainer');

            console.log('wind degrees', windDegrees);
            console.log('heading', _heading);
            // console.log('bearing', bearing);
            console.log('previous distance', prevDist);
            console.log('speed', speed);
            console.log('travel dist', travelDist);

            // move boat
            boat.setLatLng(newCoords);
            // add new lat lng to boat path
            path.addLatLng(newCoords);
            // update heading arrow
            headingIndicator.style.transform = 'rotate(' + windDegrees + 'deg)';


            // add new bearing line to map
            // newBearingLine.addTo(map);

            // console.log('speed', speed * 3.6);
            // console.log('new point', newCoords);
            // console.log('distance', travelDist);

            // start sailing
            window.setTimeout(function() {
                mod.move();
            }, _timeInterval);


            // return distance moved based on heading, wind, boat speed, and timeinterval
            function _getDistance(h, w, s, t) {
                var windVelocity = w.current_observation.wind_kph,
                    windDegrees = w.current_observation.wind_degrees,
                    // twa = _getTrueWindAngle(h, windDegrees),
                    apparentAngle = _getApparentWindAngle(windVelocity, h, s),
                    boatVelocity = _getBoatVelocity(windVelocity, windDegrees, apparentAngle);

                // return distance travelled
                // based on boat velocity of kilometers per hour
                // return meters per _timeInterval (ms)
                return (boatVelocity * 0.277778) * (1000/t);

                // calculate boat velocity based on wind velocity and apparent and true wind angles
                // https://sites.google.com/site/yoavraz2/sailingboatspeedvs.windspeed
                function _getBoatVelocity(wv, twa, aa) {
                    return wv * (
                        Math.sin(twa - aa) /
                        Math.sin(aa)
                    );
                }

                // calculate apparent wind angle
                // https://en.wikipedia.org/wiki/Apparent_wind
                function _getApparentWindAngle(wv, tw, bv) {
                    return Math.acos(
                        (wv * Math.cos(tw) + bv) /
                        (Math.sqrt(Math.pow(wv,2)+Math.pow(bv,2)+(2*wv*bv*Math.cos(tw))))
                        );
                }

                function _getTrueWindAngle(heading,wind){
                    if (wind == 0){
                        wind == 360;
                    }
                    var twa = Math.abs(wind-heading);
                    if (twa > 180){
                        twa = 180 - (twa - 180);
                    }
                    return twa;
                }
            } // end get distance function
        };  // end move function

        // keydown handler
        // changes boat heading based on left or right key
        function _keydownHandler(evt, b) {
            // left
            if(evt.which == 37) {
                _heading = _heading == 0 ? 360 : _heading-1;
            }
            // right
            if(evt.which == 39) {
                _heading = _heading == 360 ? 0 : _heading+1;
            }
            _updateBoatIcon(_heading, b);
            // console.log('heading', heading);
            // console.log('boat angle', boat.options.angle);
            function _updateBoatIcon(h,b) {
                // var boatIcon = document.getElementsByClassName('boat-icon')[0];
                // boatIcon.style.transform = 'rotate(' + h + 'deg)';
                b.options.angle = h;
            }
        }
        return mod;
    }; // end constructor return
})();