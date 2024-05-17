let score = 0;
let activeHole = null;
let timer = null;

function getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    nextHole();
    timer = setInterval(nextHole, 1000);
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

function endGame() {
    clearInterval(timer);
    alert('Game over! Your score is ' + score);
    if (activeHole) {
        activeHole.classList.remove('active');
        activeHole.removeEventListener('click', whack);
    }
}

document.getElementById('startButton').addEventListener('click', startGame);
