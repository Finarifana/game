let score = 0;
let activeHole = null;
let gameTimer = null;
let countDownTimer = null;
let timeLeft = 30;
let level = 'easy';
const levelDurations = {
    easy: 1000,
    medium: 700,
    hard: 400,
};

document.getElementById('level').addEventListener('change', (event) => {
    level = event.target.value;
});

function getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function startGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = timeLeft;
    nextHole();
    gameTimer = setInterval(nextHole, levelDurations[level]);
    countDownTimer = setInterval(updateTime, 1000);
    setTimeout(endGame, 30000); // End game after 30 seconds
}

function nextHole() {
    if (activeHole) {
        activeHole.classList.remove('active');
    }
    activeHole = getRandomHole();
    activeHole.classList.add('active');
    activeHole.addEventListener('click', whack);
}

function whack(event) {
    if (event.currentTarget === activeHole) {
        score++;
        document.getElementById('score').textContent = score;
        activeHole.classList.remove('active');
        activeHole.removeEventListener('click', whack);
    }
}

function updateTime() {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(countDownTimer);
    }
}

function endGame() {
    clearInterval(gameTimer);
    alert('Game over! Your score is ' + score);
    if (activeHole) {
        activeHole.classList.remove('active');
        activeHole.removeEventListener('click', whack);
    }
}

document.getElementById('startButton').addEventListener('click', startGame);
