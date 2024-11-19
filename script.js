const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do jogo
canvas.width = 400;
canvas.height = 400;
const box = 20; // Tamanho de cada quadrado
let snake = [{ x: 10 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
};
let direction = 'RIGHT';
let score = 0;

// Controle da cobra
document.addEventListener('keydown', changeDirection);
function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

// Atualização da posição da cobra
function moveSnake() {
    const head = { ...snake[0] };
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;

    // Adicionar a nova cabeça
    snake.unshift(head);

    // Se comer a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
    } else {
        snake.pop(); // Remover a cauda
    }
}

// Detectar colisões
function checkCollision() {
    const head = snake[0];
    // Colisão com bordas
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // Colisão com o corpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Desenho da tela
function drawGame() {
    if (checkCollision()) {
        alert(`Game Over! Sua pontuação foi: ${score}`);
        document.location.reload();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Desenhar cobra
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));

    // Atualizar a cobra
    moveSnake();

    // Mostrar pontuação
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Iniciar o jogo
setInterval(drawGame, 150);
