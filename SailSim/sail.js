function oppositeAdjacent(angle,hyp){
	var outPut= {
		lat:0,
		lon:0,
	};

	var opposite =0;
	opposite = Math.sin(angle * (Math.PI/180)) * hyp;
	var a2 =Math.pow(opposite,2)
	var c2 = Math.pow(hyp,2)
	var b = Math.sqrt(c2-a2)
	outPut.lat = b
	outPut.lon = opposite

	if (angle > 90){
		outPut.lat = b*(-1);
	}

	if (angle > 270){
		outPut.lat = b*(+1);
	}

	return outPut
}

function trueWindAngle(heading,wind){
	if (wind == 0){
		wind == 360;
	}
	var twa = Math.abs(wind-heading);
	if (twa > 180){
		twa = 180 - (twa - 180)
	}
	return twa
}

function calculateSpeed(twa){
	var constant = 1;
	var speed =0;

	speed = twa/110;

	if (twa > 110){
		speed=(110-(twa-110))/110;
	}

	if (twa < 30){
		speed=(twa/110)/2;
	}

	console.log(twa,speed)
	return speed;
}

function changeHeading(direction){

	if (direction == 'LEFT'){
		heading -= 5;

		if(heading < 0){
			heading = heading+360; 
		}

		$('#compass').text("Heading: "+heading);
		$('#boatcompass').rotate(heading);
		$('#boat').rotate(heading);

	}

	if (direction == 'RIGHT'){

		heading += 5;

		if(heading >360){
			heading = heading-360; 
		}
		$('#compass').text("Heading: "+heading)
		$('#boatcompass').rotate(heading);
		$('#boat').rotate(heading);
	}

}

function moveBoat(map){
	var time = prompt("How many hours on this course?", "0.0");

	if (time != null) {
		if (Number(time) > 6){
			alert("Leg must be less than 6 hrs in length!");
			return
		} 
		else {
			hours +=Number(time);
		}
	    
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

	$('#clock').text('Elapsed Time: '+hours+' hrs')

	try {
		weather = getWeather(lat,lon);
		windAngle = weather.current_observation.wind_degrees;
		windSpeed = Number(weather.current_observation.wind_gust_mph);

		city = weather.location.city;
		state = weather.location.state;

		console.log(windAngle,windSpeed,city,state);
	}
	catch(e) {
	}



	$('#needle2').rotate(windAngle);
}
