// var accelerationX;
// var accelerationY;
// var accelerationZ;
// 
// ondevicemotion = function(event)
// {
	// accelerationX = event.accelerationIncludingGravity.x;
	// accelerationY = event.accelerationIncludingGravity.y;
	// accelerationZ = event.accelerationIncludingGravity.z;
	// player.vx = accelerationX;
	// player.vy = accelerationY;
// };

window.addEventListener('deviceorientation', orientationHandler, false);

function orientationHandler(e)
{

	vx = (e.gamma-30)/5; // laying on ground: 0, standing on speakers: 90
	vy = (e.beta)/5; // laying on ground: 0, standing on SIM slot: 90
}