/**
 * 
 * Name: Ping-pong
 * Author: FasePlay/Alexandr Minzov.
 * 
 * Version: 1.0
 * 
 * For more information visit:
 * github.io/faseplay/ping-pong-js 
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
let score = 0;

let players = [
    {
        x: 50,
        y: 250,
        width: 20,
        height: 100
    },
    {
        x: canvas.width - 50,
        y: 250,
        width: -20,
        height: 100
    }
];

let isUp = false, isDown = false, isEnemyUp = true, isEnemyDown = false;;

const ballDirections = [45, 135, 225, 315]; 
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    direction: ballDirections[Math.floor(Math.random() * 4)],
    radius: 15
}


document.addEventListener('keydown', changePlayerPosition);
document.addEventListener('keyup', changePlayerPosition);



const timer = setInterval(drawGame, 10);

function drawGame() {
    drawElements();
    changePlayerPositionOnCanvas();
    changeBallPosition();
    changeEnemyPosition();
}




function drawElements() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    
    // Circle
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();

    //Players
    drawPlayers();

    //Score
    scoreElement.textContent = score;
}

function drawPlayers() {
    for (let i = 0; i < players.length; i++) {
        const 
            x       = players[i].x,
            y       = players[i].y,
            width   = players[i].width,
            height  = players[i].height;

        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, width, height);
    }
}


function changePlayerPosition(evt) {
    console.log(evt.type);
    if (evt.type == "keydown") {
        console.log(true);
        switch(evt.keyCode) {
            case 87:
                isUp = true;
                isDown = false;
                break;
            case 83:
                isUp = false;
                isDown = true;
                break;
        }
    } else if (evt.type == "keyup") {
        isUp = false;
        isDown = false;
    }

    if (evt.type == "keydown") {
        console.log(true);
        switch(evt.keyCode) {
            case 38:
                isEnemyUp = true;
                isEnemyDown = false;
                break;
            case 40:
                isEnemyUp = false;
                isEnemyDown = true;
                break;
        }
    } else if (evt.type == "keyup") {
        isEnemyUp = false;
        isEnemyDown = false;
    }
}


function changePlayerPositionOnCanvas() {
    if(isUp === true && players[0].y >= 0) {
        players[0].y -= 3;
    } else if (isDown === true && players[0].y + players[0].height <= canvas.height) {
        players[0].y += 3;
    }

    if(isEnemyUp === true && players[1].y >= 0) {
        players[1].y -= 3;
    } else if (isEnemyDown === true && players[1].y + players[1].height <= canvas.height) {
        players[1].y += 3;
    }
}


function changeBallPosition() {
    switch(ball.direction) {
        case 45:
            ball.x += 3;
            ball.y -= 3;
            break;
        case 135:
            ball.x += 3;
            ball.y += 3;
            break;
        case 225:
            ball.x -= 3;
            ball.y += 3;
            break;
        case 315:
            ball.x -= 3;
            ball.y -= 3;
            break;
    }

    isBallTouchWall();
}


function isBallTouchWall() {
    if (ball.y + ball.radius >= canvas.height) {
        //If touch wall
        ball.direction = ball.direction === 225 ? 315 : 45; 
    } else if (ball.y - ball.radius <= 0) {
        // If touch wall
        ball.direction = ball.direction === 45 ? 135 : 225;
    } else if (ball.x - ball.radius <= players[0].x + players[0].width && ball.y >= players[0].y && ball.y <= players[0].y + players[0].height && ball.x >= players[0].x) {
        //If touch player
        score++;
        ball.direction = ball.direction === 225 ? 135 : 45;
    } else if (ball.x + ball.radius >= players[1].x && ball.y >= players[1].y && ball.y <= players[1].y + players[1].height) {
        // If touch enemy
        ball.direction = ball.direction === 45 ? 315 : 225;
    } else if (ball.x - ball.radius <= 0) {
        score = 0;
        ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            direction: ballDirections[Math.floor(Math.random() * 4)],
            radius: 15
        }
    } else if (ball.x + ball.radius >= canvas.width) {
        ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            direction: ballDirections[Math.floor(Math.random() * 4)],
            radius: 15
        }
    }
}
