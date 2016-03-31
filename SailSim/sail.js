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

function calculateSpeed(twa,windSpeed){

	var powerRatio = twa/137.5;

	if (twa > 110){
		powerRatio=(110-(twa-110))/137.5;
	}

	if (twa < 30){
		powerRatio=(twa/110)/2;
	}

	console.log(twa,powerRatio)

	if (windSpeed ==0){
		windSpeed = 2;
	}

	speed = windSpeed*powerRatio

	return speed;
}

function changeHeading(direction){

	if (direction == 'LEFT'){
		heading -= 5;

		if(heading < 0){
			heading = heading+360; 
		}

		$('#heading').text("Heading: "+heading);
		$('#boatcompass').rotate(heading);
		$('#boat').rotate(heading);

	}

	if (direction == 'RIGHT'){

		heading += 5;

		if(heading >360){
			heading = heading-360; 
		}
		$('#heading').text("Heading: "+heading)
		$('#boatcompass').rotate(heading);
		$('#boat').rotate(heading);
	}

}

function moveBoat(map,lat,lng,heading,windAngle,windSpeed){
	var moveObject = {
		lat:'',
		lng:'',
		windAngle:0,
		windSpeed:0,
		city:'',
		state:'',
	}

	moveObject.lat = lat;
	moveObject.lng = lng;

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
	var speed =calculateSpeed(twa, windSpeed)

	
	moveObject.lat += ((tempObject.lat/1000)*speed)*time;
	moveObject.lng += ((tempObject.lon/1000)*speed)*time;
	



	$('#clock').text('Elapsed Time: '+hours+' hrs')

	try {

		weather = getWeather(lat,lon);
		moveObject.windAngle = weather.current_observation.wind_degrees;
		moveObject.windSpeed = Number(weather.current_observation.wind_gust_mph);

		moveObject.city = weather.location.city;
		moveObject.state = weather.location.state;

		console.log(windAngle,windSpeed,city,state);
	}
	catch(e) {
	}

	$('#needle2').rotate(windAngle);

	return moveObject;
}

function moveIndicator(lat,lng,heading,windAngle,windSpeed,time ){



	var newArray =[];
	var lat2 = 0;
	var lng2 = 0;

	var position1=new google.maps.LatLng(lat,lng);

	newArray.push(position1)

	var tempObject= oppositeAdjacent(heading,100);

	var twa = trueWindAngle(heading,windAngle);
	var speed =calculateSpeed(twa,windSpeed)

	
	lat2 = lat + ((tempObject.lat/1000)*speed)*time;
	lng2 = lng + ((tempObject.lon/1000)*speed)*time;

	var position2=new google.maps.LatLng(lat2,lng2);
	newArray.push(position2)

	return newArray

}



