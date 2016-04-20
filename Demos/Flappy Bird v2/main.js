const g = 9.81; // m/s^2
const g_slow_rate = 3;
const bounce_efficiency = 0.8; // (80% Kinetic energy maintained)
const color_slow_rate = 10000;
const jump_rate = 2;
const block_space = 50;
const block_width = 10;
const block_speed = 5;
const block_frequency = 4;
const player_radius = 20;

var ctx;
var player;
var blocks = [];
var score = 0;
var game_over = false;

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
        y: Math.random() * ctx.height,
        passed: false
    };
}


function drawBlock(block) {
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(block.x, 0, block_width, block.y - block_space);
    ctx.fillRect(block.x, block.y + block_space, block_width, ctx.height - block.y - block_space);
}

function setup(ctx) {
    this.ctx = ctx;
    Input.bind('onmousedown', jump);
    Input.bind('space', jump);
    player = new Player();
    blocks[0] = new Block();
}

function jump() {
    player.vy -= jump_rate;
}

function loop() {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    if (!game_over) {

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

        processBlocks();

        // Draw the player
        drawPlayer(player);

        drawScore();
    }
}

function drawScore() {
    ctx.fillStyle = '#00ffff';
    ctx.font = '30pt Arial';
    var sc = 'Score ' + score;
    ctx.fillText(sc, 100, 100);
}

function processBlocks() {
    for (var i = 0; i < blocks.length; i++) {
        // Move the block
        blocks[i].x -= block_speed;

        // Remove block if off screen
        if (blocks[i].x < -block_speed) {
            blocks.splice(i, 1);
            // Since we have removed an element from the array we are
            // itterating over, we need to go back and re-evaluate it.
            i--;
            continue;
        }

        // Add block if our block intersects with our spawn area
        if (!blocks[i].passed && blocks[i].x < ctx.width - ctx.width / block_frequency) {
            blocks[i].passed = true;
            blocks.push(new Block());
        }

        detectCollision(blocks[i]);

        // Draw the block
        drawBlock(blocks[i]);
    }
}

function detectCollision(block) {
    // The block is not even within range of the player
    // THIS IS WRONG TODO
    if (block.x > player.x + player.radius || block.x < player.x + player.radius) {
        return;
        console.log('not even close');
    } else {
        console.log('close but not close enough');
        // If the player intersects with the top bar / bottom bar
        if (player.x + player.radius <= block.y - block_space / 2 ||
            player.x - player.radius >= block.y + block_space / 2) {
            gameOver();
        } else {
            score++;
        }
    }
}

function gameOver() {
    ctx.fillStyle = '#ff0000';
    ctx.font = '70pt Arial';
    ctx.fillText('GAME OVER', 100, 300);
    game_over = true;
}

function drawPlayer(object) {
    ctx.fillStyle = object.color;
    ctx.beginPath();
    ctx.arc(object.x, object.y, object.radius, 0, 6.2832, true);
    ctx.fill();
}
