window.onload = setup;

const g = 9.81; // m/s^2
const g_slow_rate = 20;
const bounce_efficiency = 0.8; // (80% Kinetic energy maintained)
const color_slow_rate = 10000;

var ctx;
var player = new Player();

function Player() {
    return {
        x: 100,
        y: 300,
        vy: 0,
        vx: 0,
        radius: 50,
        color: 'red'
    };
}

function setup() {
    ctx = new Canvas({color:'grey', dblclick_fullscreen:false});
    Input.bind('onmousedown', function () {player.vy -= 10;});
    loop();
}

function loop() {
    requestAnimationFrame(loop);

    // Move the player
    player.y += player.vy;
    player.x += player.vx;

    // Stop the ball when it hits the ground (y mod)
    if (player.y < ctx.height - player.radius) {
        player.vy += g / g_slow_rate;
    } else {
        player.y = ctx.height - player.radius;
        player.vy *= -bounce_efficiency;
        player.color = 'rgb(' + hslToRgb(Math.random(), 1, 0.5) + ')';
    }

    // Move the player towards the mouse (x mod)
    player.vx = 10 * (Input.x - player.x) / ctx.width;

    // Draw the player
    draw(player);
}

function draw(object) {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.fillStyle = object.color;
    ctx.beginPath();
    ctx.arc(object.x, object.y, object.radius, 0, 6.2832, true);
    ctx.fill();
}
