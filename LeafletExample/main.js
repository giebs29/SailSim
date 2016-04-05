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

    // boat icon class
    // var boatIconClass = L.divIcon.extend({
    //         options: {
    //             iconSize:     [30, 30],
    //             iconAnchor:   [15, 30],
    //             className : 'boat-icon',
    //             html : '<img src="sailboat.png">'
    //         }
    //     }),

    // MIT-licensed code by Benjamin Becquet
    // https://www.mapbox.com/mapbox.js/example/v1.0.0/rotating-controlling-marker/
    // https://github.com/bbecquet/Leaflet.PolylineDecorator
    L.RotatedMarker = L.Marker.extend({
      options: { angle: 0 },
      _setPos: function(pos) {
        L.Marker.prototype._setPos.call(this, pos);
        if (L.DomUtil.TRANSFORM) {
          // use the CSS transform rule if available
          this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.angle + 'deg)';
        } else if (L.Browser.ie) {
          // fallback for IE6, IE7, IE8
          var rad = this.options.angle * L.LatLng.DEG_TO_RAD,
          costheta = Math.cos(rad),
          sintheta = Math.sin(rad);
          this._icon.style.filter += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11=' +
            costheta + ', M12=' + (-sintheta) + ', M21=' + sintheta + ', M22=' + costheta + ')';
        }
      }
    });
    L.rotatedMarker = function(pos, options) {
        return new L.RotatedMarker(pos, options);
    };

        // boat icon
    // var boatIcon = L.divIcon({
    //         iconSize:     [30, 30],
    //         iconAnchor:   [15, 30],
    //         className : 'boat-icon',
    //         html : '<img src="sailboat.png">'
    //     }),
    //     boat = L.marker([46.811228, -90.811675], {
    //         icon: boatIcon
    //     }).addTo(mymap),
    boat = L.rotatedMarker(new L.LatLng(46.811228, -90.811675), {
      icon: L.icon({
        iconUrl: 'sailboat.png',
        iconSize: [30,30],
      }),
      draggable: true
    }).addTo(mymap),
        // boat path
        boatPath = L.polyline([L.latLng(46.811228, -90.811675)]).addTo(mymap),
        sailing = new Sail(mymap, boat, boatPath);


    // boat.options.angle = heading;

    // Sail!!
    sailing.move();
})();