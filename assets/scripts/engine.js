const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },

    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        remainingLives: 3
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        counDownTImerId: setInterval(countDown, 1000),
    }
}

function liveDown() {
    state.values.remainingLives--;
    state.view.lives.textContent = "x" + state.values.remainingLives;
    if(state.values.remainingLives < 0){
        alert("Game Over! O seu resultado foi: " + state.values.result);
        state.values.remainingLives = 3;
        state.view.lives.textContent = "x" + state.values.remainingLives;
        state.values.result = 0;
        state.view.score.textContent = state.values.result;     
    }
}

function playSound(audioName) {
    let audio = new Audio(`./assets/audios/${audioName}.m4a`)
    audio.volume = 0.2;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.counDownTImerId);
        clearInterval(state.actions.timerId);
        alert("Game OVer! O seu resultado foi: " + state.values.result);
        state.values.result = 0
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomNumber;
}


/* Listener espera uma ação ser executada */
function addListenerHitbox() {
    state.view.squares.forEach((square, index) => {
        square.addEventListener("mousedown", () => {
            if (index === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit")
            }else{
                liveDown();
            }
        })
    });
}

function initialize() {
    addListenerHitbox();
}

initialize()
