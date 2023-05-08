// ----------------- variable for canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// ----------------- create the paddle
const paddleHeight = 12;
const paddleWidth = 72;

// ----------------- position starting point of paddle
let paddleX = (canvas.width - paddleWidth) / 2;

// ---- variables for right and left arrows on keyboard
let rightPressed = false;
let leftPressed = false;

// ----------------- variable for bricks
const brickRowCount = 4;
const brickColumnCount = 7;
const brickWidth = 72;
const brickHeight = 24;
const brickPadding = 12;
const brickOffsetLeft = 32;
const brickOffsetTop = 32;

// ------------------ variables to take score
let score = 0;

// ------------------ Creating arrays for the bricks
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        //set the x and y position of the bricks
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// paddle movement to mouse movement
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 37) {
        leftPressed = false;
    }
}

// ----- Create a function to create the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2,);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// ----- Create a function to create the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

// ----- Create a function to draw the bricks
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight+ brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "orange";
                ctx.fill();
                ctx.closePath();
            }

        }
    }
}

//  ----- Create a function to keep track of score
function drawScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "brown";
    ctx.fillText(`score: ${score}`, 8, 20);
}

// ----- Collision detection for the bricks
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickColumnCount * brickRowCount) {
                        alert(`congratulations!! You've won!`);
                        document.location.reload()
                    }
                }
            }

        }

    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBall();
    drawBricks();
    drawPaddle();
    collisionDetection();

    // ----- left and right walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // ------ top wall
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // ------ detect paddle hits
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // ----- body of canvas is hit ==> game over
            alert('game over !!');
            document.location.reload();
        }
    }

    // ------ bottom wall 
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    // ------ Make paddle move
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    //  ----- Making the ball move
    x += dx;
    y += dy;
}

setInterval(draw,10);




























