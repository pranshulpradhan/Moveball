const ballElement = document.getElementById("ball");
const audioCorrect = document.getElementById("audio-correct");
const audioJump = document.getElementById("audio-jump");
const audioWrong = document.getElementById("audio-wrong");
const audioLeft = document.getElementById("audio-left");
const audioRight = document.getElementById("audio-right");
const rulesPopup = document.getElementById("rulesPopup");


ballElement.addEventListener("mouseenter", () => {
    rulesPopup.classList.add("active");
});


ballElement.addEventListener("mouseleave", () => {
    rulesPopup.classList.remove("active");
});
let x = 0;
let y = 0;
let gameOverFlag = false;

function showGameOverPopup() {
    if (!gameOverFlag) {
        ballElement.style.backgroundColor = "red";
        playAudio(audioWrong);
        setTimeout(() => {
            const gameOverPopup = document.getElementById("gameOverPopup");
            gameOverPopup.classList.add("active");

            const restartButton = document.getElementById("restartButton");
            restartButton.addEventListener("click", () => {
                hideGameOverPopup();
            });

        }, 100);
        gameOverFlag = true;
    }
}

function hideGameOverPopup() {
    document.getElementById("gameOverPopup").classList.remove("active");
    restartGame();
}

function restartGame() {
    x = 0;
    y = 0;
    updateBallPosition();
    gameOverFlag = false;
    ballElement.style.backgroundColor = "aqua";
    playAudio(audioCorrect);
}

function updateBallPosition() {
    ballElement.style.left = x + "px";
    ballElement.style.top = y + "px";
}

function playAudio(audio) {
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

function checkBoundary(dx, dy) {
    const ballRect = ballElement.getBoundingClientRect();
    const viewportRect = document.body.getBoundingClientRect();

    if (
        ballRect.left + dx < viewportRect.left ||
        ballRect.right + dx > viewportRect.right ||
        ballRect.top + dy < viewportRect.top ||
        ballRect.bottom + dy > viewportRect.bottom
    ) {
        showGameOverPopup();
    }
}

function moveAndPlayAudio(dx, dy) {
    x = Math.max(0, Math.min(window.innerWidth - ballElement.clientWidth, x + dx));
    y = Math.max(0, Math.min(window.innerHeight - ballElement.clientHeight, y + dy));
    updateBallPosition();
    checkBoundary(dx, dy);

    if (dx > 0) {
        playAudio(audioRight);
    } else if (dx < 0) {
        playAudio(audioLeft);
    }
}

document.addEventListener("keydown", (event) => {
    const step = 10;

    switch (event.key) {
        case "w":
            moveAndPlayAudio(0, -step);
            playAudio(audioJump);
            break;
        case "a":
            moveAndPlayAudio(-step, 0);
            break;
        case "s":
            moveAndPlayAudio(0, step);
            playAudio(audioJump);
            break;
        case "d":
            moveAndPlayAudio(step, 0);
            break;
    }

    event.preventDefault();
});

updateBallPosition();
