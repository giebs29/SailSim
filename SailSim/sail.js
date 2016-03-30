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
