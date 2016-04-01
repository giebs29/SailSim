function _sail(map, boat, path, heading) {
    // set interval of movement (ms)
    // also used in determining speed
    var timeInterval = 200,
        // get time ratio
        secRatio = timeInterval/1000,
        // get current coords
        currentCoords = boat.getLatLng(),
        // previous coords
        prevCoords = path.getLatLngs().pop(),
        // get weather conditions
        weather = getWeather(currentCoords.lat, currentCoords.lng),
        // get actual wind angle
        windDegrees = weather.current_observation.wind_degrees,
        // get bearing
        bearing = L.GeometryUtil.bearing(prevCoords, currentCoords),
        // get previous distance traveled
        prevDist = L.GeometryUtil.distance(map, prevCoords, currentCoords),
        // get speed = distance over time = meters per second
        speed = (prevDist == 0 ? .2 : prevDist) * secRatio,
        // get travel distance
        travelDist = _getDistance(bearing, heading, weather, speed, timeInterval),
        newCoords = L.GeometryUtil.destination(currentCoords,heading,travelDist),
        headingIndicator = document.getElementById('headingContainer');

    // console.log(weather);
    // move boat
    boat.setLatLng(newCoords);
    // add new lat lng to boat path
    path.addLatLng(newCoords);
    // update heading arrow
    headingIndicator.style.transform = 'rotate(' + windDegrees + 'deg)';


    // add new bearing line to map
    // newBearingLine.addTo(map);

    console.log('speed', speed * 3.6);
    // console.log('new point', newCoords);
    console.log('distance', travelDist);

    // start sailing
    window.setTimeout(function() {
        _sail(map, boat, path, heading);
    }, timeInterval);


    // return distance moved based on bearing, heading, and wind
    function _getDistance(b, h, w, s, t) {
        var windVelocity = w.current_observation.wind_kph,
            windDegrees = w.current_observation.wind_degrees,
            twa = _getTrueWindAngle(h, windDegrees),
            apparentAngle = _getApparentWindAngle(windVelocity, twa, s),
            boatVelocity = _getBoatVelocity(windVelocity, twa, apparentAngle);

        // return distance travelled
        // based on boat velocity of kilometers per hour
        // return meters per timeInterval (ms)
        return (boatVelocity * 0.277778) * (1000/t);

        // calculate boat velocity based on wind velocity and apparent and true wind angles
        function _getBoatVelocity(wv, twa, aa) {
            return wv * (
                Math.sin(twa - aa) /
                Math.sin(aa)
            );
        }

        // calculate apparent wind angle
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
                twa = 180 - (twa - 180)
            }
            return twa;
        }
    } // end get distance function
}