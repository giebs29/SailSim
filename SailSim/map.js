var myCenter=new google.maps.LatLng(46.780754, -92.086534);
var lat=46.780754;
var lon =-92.086534;
var heading = 360;
var weather = "";

var windAngle =27;
var windSpeed = 0;
var hours=0;
var route =[];

var rangeLine1=new google.maps.Polyline({
	  path:[],
	  strokeColor:"#FF0000",
	  strokeOpacity:1,
	  strokeWeight:2
	  });

var rangeLine2=new google.maps.Polyline({
	  path:[],
	  strokeColor:"#000000",
	  strokeOpacity:1,
	  strokeWeight:2
	  });

var rangeLine3=new google.maps.Polyline({
	  path:[],
	  strokeColor:"#FF0000",
	  strokeOpacity:1,
	  strokeWeight:2
	  });

var rangeLine4=new google.maps.Polyline({
	  path:[],
	  strokeColor:"#000000",
	  strokeOpacity:1,
	  strokeWeight:2
	  });

var rangeLine5=new google.maps.Polyline({
	  path:[],
	  strokeColor:"#FF0000",
	  strokeOpacity:1,
	  strokeWeight:2
	  });

var rangeLine6=new google.maps.Polyline({
	  path:[],
	  strokeColor:"#000000",
	  strokeOpacity:1,
	  strokeWeight:2
	  });

var sailboat=new google.maps.Marker({
  position:myCenter,
  icon:'sailboat.png'
  });

var sailroute=new google.maps.Polyline({
		  path:route,
		  strokeColor:"#0000FF",
		  strokeOpacity:0.8,
		  strokeWeight:2
		  });

		
x = window.innerWidth/2;
y = window.innerHeight/2;

$("#wind").css("left",x);
$("#wind").css("top",y);

$(document).ready(function(){
  var mapProp = {
    center:new google.maps.LatLng(46.780754, -92.086534),
    zoom:12,
    scaleControl:true,
    mapTypeId:google.maps.MapTypeId.TERRAIN
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


  
	sailboat.setMap(map);
	route.push(new google.maps.LatLng(lat,lon));
	sailroute.setMap(map);
	rangeLine1.setMap(map);
	rangeLine2.setMap(map);
	rangeLine3.setMap(map);
	rangeLine4.setMap(map);
	rangeLine5.setMap(map);
	rangeLine6.setMap(map);

	var newPath1 = moveIndicator(lat,lon,heading,windAngle,windSpeed,1);
	var newPath2 = moveIndicator(lat,lon,heading,windAngle,windSpeed,2);
	var newPath3 = moveIndicator(lat,lon,heading,windAngle,windSpeed,3);
	var newPath4 = moveIndicator(lat,lon,heading,windAngle,windSpeed,4);
	var newPath5 = moveIndicator(lat,lon,heading,windAngle,windSpeed,5);
	var newPath6 = moveIndicator(lat,lon,heading,windAngle,windSpeed,6);
	rangeLine1.setPath(newPath6);
	rangeLine2.setPath(newPath5);
	rangeLine3.setPath(newPath4);
	rangeLine4.setPath(newPath3);
	rangeLine5.setPath(newPath2);
	rangeLine6.setPath(newPath1);

	$('#heading').text("Heading: "+heading);
	$('#clock').html('<p>Elapsed Time: '+hours+' hrs</p>');
	
	var compassPos =$('#bearingCompass').position();
	var needle2Pos =$('#windCompass').position();
	
	$('#boatcompass').css({
		top:compassPos.top+50,
		left: ($('#bearingCompass').width()/2)-15.35,
	});

	$('#needle2').css({
		top:needle2Pos.top,
		left: ($('#windCompass').width()/2)-2,
	});

	weather = getWeather(lat,lon);
	windAngle = weather.current_observation.wind_degrees;
	windSpeed = Number(weather.current_observation.wind_gust_mph);

	$('#windSpeed').text('Wind Speed: '+windSpeed+' mph')

	var city = weather.location.city;
	var state = weather.location.state;

	console.log(windAngle,windSpeed,city,state);
	
	$('#needle2').rotate(windAngle);

	$('#sail').click(function(){
		moveBoat(map);
	});

	$('#left').click(function(){
		changeHeading('LEFT');
	});

	$('#right').click(function(){
		changeHeading('RIGHT');
	});

	$("body").keydown(function(e) {

  		if(e.keyCode == 37) { // left
    		changeHeading('LEFT');

    		var newPath1 = moveIndicator(lat,lon,heading,windAngle,windSpeed,1);
	    	var newPath2 = moveIndicator(lat,lon,heading,windAngle,windSpeed,2);
	    	var newPath3 = moveIndicator(lat,lon,heading,windAngle,windSpeed,3);
	    	var newPath4 = moveIndicator(lat,lon,heading,windAngle,windSpeed,4);
	    	var newPath5 = moveIndicator(lat,lon,heading,windAngle,windSpeed,5);
	    	var newPath6 = moveIndicator(lat,lon,heading,windAngle,windSpeed,6);
	    	rangeLine1.setPath(newPath6);
	    	rangeLine2.setPath(newPath5);
	    	rangeLine3.setPath(newPath4);
	    	rangeLine4.setPath(newPath3);
	    	rangeLine5.setPath(newPath2);
	    	rangeLine6.setPath(newPath1);
  		}
  		else if(e.keyCode == 39) { // right
	    	changeHeading('RIGHT');


	    	
	    	var newPath1 = moveIndicator(lat,lon,heading,windAngle,windSpeed,1);
	    	var newPath2 = moveIndicator(lat,lon,heading,windAngle,windSpeed,2);
	    	var newPath3 = moveIndicator(lat,lon,heading,windAngle,windSpeed,3);
	    	var newPath4 = moveIndicator(lat,lon,heading,windAngle,windSpeed,4);
	    	var newPath5 = moveIndicator(lat,lon,heading,windAngle,windSpeed,5);
	    	var newPath6 = moveIndicator(lat,lon,heading,windAngle,windSpeed,6);
	    	rangeLine1.setPath(newPath6);
	    	rangeLine2.setPath(newPath5);
	    	rangeLine3.setPath(newPath4);
	    	rangeLine4.setPath(newPath3);
	    	rangeLine5.setPath(newPath2);
	    	rangeLine6.setPath(newPath1);
  		}
  		else if(e.keyCode == 32) { // path
	    	var positionData = moveBoat(map,lat,lon,heading,windAngle,windSpeed);

	    	var newPosition=new google.maps.LatLng(positionData.lat,positionData.lng);

	    	lat = positionData.lat; 
	    	lon = positionData.lng;

			sailboat.position = newPosition;
			sailboat.setMap(map);

			route.push(newPosition);

			sailroute.setPath(route);
			map.panTo(newPosition);

			windSpeed = positionData.windSpeed;

			$('#windSpeed').text('Wind Speed: '+windSpeed+' mph');
  		}
	});

});






