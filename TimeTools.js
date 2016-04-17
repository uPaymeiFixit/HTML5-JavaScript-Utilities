function subtractTime(startTime, endTime) {
	return minutesToTime(timeToMinutes(endTime)-timeToMinutes(startTime))
}

// Takes an any number of times as string (ex: "15:30") and adds them together
function addTime() 
{
	var totalTime = 0;
	for (var i in arguments)
		totalTime += timeToMinutes(arguments[i]);
	return minutesToTime(totalTime);
}


function minutesToTime(_minutes) {
	minutes = _minutes%60
	hours = (_minutes-minutes)/60
	return hours+":"+ (minutes < 10 ? "0" : "") + minutes
}

function timeToMinutes(time) {
	array = time.split(":")
	return array[0]*60+array[1]*1
}

function currentTime() {
	time = new Date()
	return time.getHours() + ":" + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()
}

addTime("4:00", subtractTime("12:40",currentTime()))
