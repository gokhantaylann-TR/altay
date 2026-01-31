const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.7;
let levelData;
let firePower = false;
let starCollected = false;

const player = {
    x: 50,
    y: 100,
    w: 32,
    h: 48,
    vx: 0,
    vy: 0,
    onGround: false
};

let platforms = [];
let diamond = {};
let star = {};

fetch("levels.json")
.then(res => res.json())
.then(data => {
    levelData = data.levels[0];
    platforms = levelData.platforms;
    diamond = levelData.diamond;
    star = levelData.star;
});

function drawPlayer() {
    ctx.fillStyle = firePower ? "orange" : "#4da6ff";
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawPlatforms() {
    ctx.fillStyle = "#666";
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.w, p.h);
    });
}

function drawDiamond() {
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(diamond.x, diamond.y, 8, 0, Math.PI * 2);
    ctx.fill();
}

function drawStar() {
    if (starCollected) return;
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(star.x, star.y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    player.vy += gravity;
    player.y += player.vy;
    player.onGround = false;

    platforms.forEach(p => {
        if (
            player.x < p.x + p.w &&
            player.x + player.w > p.x &&
            player.y + player.h < p.y + 20 &&
            player.y + player.h + player.vy >= p.y
        ) {
            player.y = p.y - player.h;
            player.vy = 0;
            player.onGround = true;
        }
    });

    // Diamond
    if (Math.abs(player.x - diamond.x) < 20 && Math.abs(player.y - diamond.y) < 20) {
        diamond.x = -100;
    }

    // Star (only once)
    if (!starCollected && Math.abs(player.x - star.x) < 20 && Math.abs(player.y - star.y) < 20) {
        starCollected = true;
        firePower = true;
        setTimeout(() => firePower = false, 5000);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawDiamond();
    drawStar();
    drawPlayer();

    requestAnimationFrame(update);
}

window.addEventListener("touchstart", () => {
    if (player.onGround) {
        player.vy = -14;
    }
});

update();