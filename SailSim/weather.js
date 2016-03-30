function getWeather(latitude,Longitude){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://api.wunderground.com/api/2e1c3d4cdf3c0b2c/geolookup/conditions/forecast/q/"+latitude+","+Longitude+".json", false);
	xhr.send();

	return JSON.parse(xhr.responseText);
}