var myCenter=new google.maps.LatLng(46.780754, -92.086534);
var lat=46.780754;
var lon =-92.086534;
var heading = 360;
var weather = "";

var windAngle =27;
var windSpeed = 0;
var hours=0;
var line =[];

var sailboat=new google.maps.Marker({
  position:myCenter,
  icon:'sailboat.png'
  });

var sailroute=new google.maps.Polyline({
		  path:line,
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
	line.push(new google.maps.LatLng(lat,lon));
	sailroute.setMap(map);

	$('#compass').text("Heading: "+heading);
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

	var city = weather.location.city;
	var state = weather.location.state;

	console.log(windAngle,windSpeed,city,state);
	
	$('#needle2').rotate(windAngle);

	$('#sail').click(function(){

		var time = prompt("How many hours on this course?", "0.0");

		if (time != null) {
		    hours +=Number(time);
		}
	

		var tempObject= oppositeAdjacent(heading,100);

		var twa = trueWindAngle(heading,windAngle);
		var speed =calculateSpeed(twa)

		
		lat += ((tempObject.lat/1000)*speed)*time;
		lon += ((tempObject.lon/1000)*speed)*time;

		line.push(new google.maps.LatLng(lat,lon));

		var newPosition=new google.maps.LatLng(lat,lon);
		sailboat.position=newPosition
		sailboat.setMap(map);

		var sailroute=new google.maps.Polyline({
		  path:line,
		  strokeColor:"#0000FF",
		  strokeOpacity:0.8,
		  strokeWeight:2
		  });

		

		sailroute.setMap(map);
		map.panTo(new google.maps.LatLng(lat,lon));
		// $('#clock').remove();
		$('#clock').text('Elapsed Time: '+hours+' hrs')

		weather = getWeather(lat,lon);
		windAngle = weather.current_observation.wind_degrees;
		windSpeed = Number(weather.current_observation.wind_gust_mph);

		var city = weather.location.city;
		var state = weather.location.state;

		console.log(windAngle,windSpeed,city,state);

		$('#needle2').rotate(windAngle);
	});

	

	$('#left').click(function(){
		heading -= 5;

		if(heading < 0){
			heading = heading+360; 
		}
		$('#compass').text("Heading: "+heading)
		$('#boatcompass').rotate(heading);
		$('#boat').rotate(heading);

	});

	$('#right').click(function(){
		heading += 5;

		if(heading >360){
			heading = heading-360; 
		}
		$('#compass').text("Heading: "+heading)
		$('#boatcompass').rotate(heading);
		$('#boat').rotate(heading);
	});

});






