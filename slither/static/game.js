const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{x: 300, y: 300}];
let direction = "RIGHT";
let food = {x: Math.floor(Math.random()*60)*10, y: Math.floor(Math.random()*60)*10};

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
    ctx.clearRect(0, 0, 600, 600);

    // Affiche la nourriture
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);

    // Déplacement du serpent
    let head = {x: snake[0].x, y: snake[0].y};
    if (direction === "UP") head.y -= 10;
    if (direction === "DOWN") head.y += 10;
    if (direction === "LEFT") head.x -= 10;
    if (direction === "RIGHT") head.x += 10;

    snake.unshift(head);

    // Collision avec la nourriture
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random()*60)*10,
            y: Math.floor(Math.random()*60)*10
        };
    } else {
        snake.pop();
    }

    // Affiche le serpent
    ctx.fillStyle = "lime";
    for (let part of snake) {
        ctx.fillRect(part.x, part.y, 10, 10);
    }

    // Collision avec les murs
    if (head.x < 0 || head.y < 0 || head.x >= 600 || head.y >= 600) {
        alert("Game Over !");
        document.location.reload();
    }

    // Collision avec soi-même
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert("Game Over !");
            document.location.reload();
        }
    }
}

setInterval(draw, 100);
