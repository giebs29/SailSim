var myCenter=new google.maps.LatLng(46.780754, -92.086534);
var lat=46.780754;
var lon =-92.086534;
var heading = 360;
var windAngle =27;
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

	$('#compass').text(heading)
	$('#clock').html('<p>Elapsed time: '+hours+' hrs</p>')
	
	var needle1Pos =$('#bearingCompass').position();
	var needle2Pos =$('#windCompass').position();
	
	$('#needle1').css({
		top:needle1Pos.top,
		left: ($('#bearingCompass').width()/2)-2,
	});
	$('#needle2').css({
		top:needle2Pos.top,
		left: ($('#windCompass').width()/2)-2,
	});
	
	$('#needle2').rotate(windAngle);

	$('#sail').click(function(){

		var time = prompt("How many hours on this course?", "0.0");

		if (time != null) {
		    hours +=time;
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
		$('#clock').html('<p>Elapsed time: '+hours+' hrs</p>')
	});

	

	$('#left').click(function(){
		heading -= 5;

		if(heading < 0){
			heading = heading+360; 
		}
		$('#compass').text(heading)
		$('#needle1').rotate(heading);

	});

	$('#right').click(function(){
		heading += 5;

		if(heading >360){
			heading = heading-360; 
		}
		$('#compass').text(heading)
		$('#needle1').rotate(heading);
	});
});






