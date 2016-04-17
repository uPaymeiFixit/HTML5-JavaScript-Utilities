window.onload = setup;

const g = 9.81; // m/s^2
const g_slow_rate = 3;
const bounce_efficiency = 0.8; // (80% Kinetic energy maintained)
const color_slow_rate = 10000;
const jump_rate = 2;
const block_space = 50;
const block_width = 10;
const block_speed = 5;
const block_frequency = 2;
const player_radius = 20;

var ctx;
var player;
var blocks = [];

function Player() {
    return {
        x: 100,
        y: 300,
        vy: 0,
        vx: 0,
        radius: player_radius,
        color: 'red'
    };
}

function Block() {
    return {
        x: ctx.width,
        y: Math.random() * ctx.height
    };
}


function drawBlock(block) {
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(block.x, 0, block_width, block.y - block_space);
    ctx.fillRect(block.x, block.y + block_space, block_width, ctx.height - block.y - block_space);
}

function setup() {
    ctx = new Canvas({color:'grey', dblclick_fullscreen:false});
    Input.bind('onmousedown', jump);
    Input.bind('space', jump);
    player = new Player();
    blocks[0] = new Block();
    loop();
}

function jump() {
    player.vy -= jump_rate;
}

function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, ctx.width, ctx.height);


    // Move the player
    player.y += player.vy;
    player.y += g / g_slow_rate;
    // ################## DEBUG ###################
    player.y = ctx.height / 2;
    // ################## DEBUG ###################

    // Stop the ball when it hits the ground (y mod)
    if (player.y > ctx.height + player.radius) {
        gameOver();
    }

    for (var i in blocks) {
        // Move the block
        blocks[i].x -= block_speed;

        // Remove block if off screen
        if (blocks[i].x < -block_speed) {
            blocks.splice(i, 1);
            continue;
        }

        // Add block if our block intersects with our spawn area
        var right_bound = ctx.width - ctx.width / block_frequency;
        var left_bound = right_bound - block_speed;
        if (blocks[i].x >= left_bound && blocks[i].x <= right_bound) {
            blocks.push(new Block());
        }

        // Draw the block
        drawBlock(blocks[i]);
    }

    // Draw the player
    drawPlayer(player);
}

function gameOver() {
    alert('Game Over!');
    window.location = window.location;
}

function drawPlayer(object) {
    ctx.fillStyle = object.color;
    ctx.beginPath();
    ctx.arc(object.x, object.y, object.radius, 0, 6.2832, true);
    ctx.fill();
}
