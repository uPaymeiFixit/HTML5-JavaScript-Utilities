/*
* Space Invaders structure
** @author Josh GIbbs - uPaymeiFixit@gmail.com
*/

var ctx,_WIDTH,_HEIGHT,
	ai = [],
	player,
	bullet = [],
	frame = 0,
	timer,
	score = 0;

window.onload = function (){
	setup();
	for (var i = 0; i < 50; i++) {
		makeAI();
	};
	makePlayer();
	main();
};

//window.onresize = setup;

function setup(){
	_WIDTH = window.innerWidth;
	_HEIGHT = window.innerHeight;
	ctx = Canvas();
	ctx.font = "20pt Arial";
};

/*** INPUT ***/

var mx = 0, my = 0, mdown = false;
document.onmousemove = function(e) { mx = e ? e.pageX : event.pageX; my = e ? e.pageY : event.pageY };
document.onmousedown = function() { mdown = true };
document.onmouseup = function() { mdown = false };
document.onkeypress = function(e) {
	e = e ? e : event;
	if( e.keyCode == 112 ) {
		console.log("Game pause button has been pressed. No code present.");
	};
};

function makePlayer() {
	player = {x: _WIDTH / 2,
			y: _HEIGHT / 2,
			radius: 6 };
};

function makeAI() {
	if( Math.random() > 0.5 ) {
		var x = Math.random() < 0.5 ? Math.random() * -100 : Math.random() * 100 + _WIDTH;
		var y = Math.random() * _HEIGHT;
	} else {
		var x = Math.random() * _WIDTH;
		var y = Math.random() < 0.5 ? Math.random() * -100 : Math.random() * 100 + _HEIGHT;
	};
	ai[ai.length] = {x: x,
					y: y,
					radius: 4 };
};

function makeBullet() {
	bullet[bullet.length] = {
		x: player.x,
		y: player.y,
		vx: player.vx * 5,
		vy: player.vy * 5,
		radius: 2 }
};

function main() {

	ctx.clearRect(0, 0, _WIDTH, _HEIGHT);

	if ( ( !( frame++ % 2) ) && mdown ) {
		makeBullet();
	};

	var theta = Math.atan2(( my - player.y ), ( mx - player.x ));
	player.vx = Math.cos( theta ) * 5;
	player.vy = Math.sin( theta ) * 5;

	player.x += player.vx;
	player.y += player.vy;

	ctx.fillStyle = '#00ff00';
	draw( player );

	for ( var i = 0; i < bullet.length; i++ ) {

		bullet[ i ].x += bullet[ i ].vx;
		bullet[ i ].y += bullet[ i ].vy;

		ctx.fillStyle = '#ff00ff';
		draw( bullet[ i ] );

		for (var j = 0; j < ai.length; j++) {
			if ( bullet[i].IntersectsWith(ai[j]) ) {
				ai.splice( j, 1 );
				bullet.splice( i, 1 );
				makeAI();
				makeAI();
				score++;
			};
		};

		if ( bullet[ i ].x > _WIDTH || bullet[ i ].x < 0 || bullet[ i ]. y > _HEIGHT || bullet[ i ].y < 0 ) {
			bullet.splice( i, 1 );
		};

		ctx.fillStyle = '#00ffff'
		var sc = "Score " + score;
		ctx.fillText(sc, 100, 100)

	};

	

	ctx.fillStyle = '#ffffff';
	for ( var i = 0; i < ai.length; i++ ) {

		var theta = Math.atan2(( player.y - ai[i].y ), ( player.x - ai[i].x ));
		ai[i].vx = Math.cos( theta );
		ai[i].vy = Math.sin( theta );

		ai[i].x += ai[i].vx;
		ai[i].y += ai[i].vy;

		draw( ai[ i ] );

		if ( ai[i].IntersectsWith(player) ) {
			console.log("Game over. Animation frame needs to be stopped.");
			ctx.fillStyle = '#ff0000'
			ctx.font = "70pt Arial";
			ctx.fillText('GAME OVER', 100, 300)
			return null;
		};
	};

	requestAnimationFrame(main);
};

function draw( ob ) {
	ctx.beginPath();
	ctx.arc(ob.x,ob.y,ob.radius,0,6.2832, true);
	ctx.fill();
};