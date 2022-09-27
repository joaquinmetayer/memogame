// stat variables
let cardsUncovers = 0;
let card01 = null;
let card02 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer = false;
let startTimer = 99;
let seconds = 99;
let regresiveTime = null;

let winAudio = new Audio('./assets/sound/win.wav');
let loseAudio = new Audio('./assets/sound/lose.wav');
let clickAudio = new Audio('./assets/sound/click.wav');
let rightAudio = new Audio('./assets/sound/right.wav');
let wrongAudio = new Audio('./assets/sound/wrong.wav');
let timeAudio = new Audio('./assets/sound/time.wav');

let playingAudio = new Audio('./assets/sound/playing.mp3');

let startSoundAudio = new Audio('./assets/sound/start.wav');

// a document html
let showMovements = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTime = document.getElementById('time')
let showEndMsj = document.getElementById('end-msj')
let resetButton = document.getElementById('restart-game')

// numbers
let numbers = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14];
numbers = numbers.sort( () => {return Math.random() - 0.5});
console.log(numbers);

// functions
function countTime(){
    playingAudio.play();
    regresiveTime = setInterval(() => {
        seconds--;
        timeAudio.play();
        showTime.innerHTML = `TIM ${seconds}`;
        if(seconds == 0){
            clearInterval(regresiveTime);
            blockCards();
            loseAudio.play();
            playingAudio.pause();
            showHits.innerHTML = ``;
            showMovements.innerHTML = ``;
            showTime.innerHTML = ``;
            showEndMsj.innerHTML = `<span class="end-msj-looser">GOOD LOSER!</span>`;
            resetButton.innerHTML = `<a class="reset-msj" onClick="buttonRestartAction()"
            >Restart</a>`; 
        }
    }, 1250)
}
function blockCards(){
    for (let i = 0; i <= 29; i++){
        let cardBlock = document.getElementById(i);
        cardBlock.innerHTML = `<img src="./assets/img/${numbers[i]}.png">`;
        cardBlock.disabled = true;
    }
}
function startSound(){
    startSoundAudio.play();
}
function buttonRestartAction(){
    startSoundAudio.play();
    window.location.reload(true)
}

// principal function
function uncover(id){

    if(timer == false){
        countTime();
        timer = true;
    };

    cardsUncovers++;
    console.log(cardsUncovers);

    if(cardsUncovers == 1){
        // show first number
        card01 = document.getElementById(id);
        firstResult = numbers[id];
        card01.innerHTML = `<img src="./assets/img/${firstResult}.png">`;

        clickAudio.play();

        // disable first button
        card01.disabled = true;
    }else if(cardsUncovers == 2){
        // show second number
        card02 = document.getElementById(id);
        secondResult = numbers[id];
        card02.innerHTML = `<img src="./assets/img/${secondResult}.png">`;

        // disable second button
        card02.disabled = true;

        // add movements
        movements++;
        showMovements.innerHTML = `MOV ${movements}`;

        if(firstResult == secondResult){
            // to cero cards uncover
            cardsUncovers = 0;

            // add hits
            hits++;
            showHits.innerHTML = `HIT ${hits}`;

            rightAudio.play();
        }else{

            wrongAudio.play();

            // show timeout
            setTimeout(() => {
                card01.innerHTML = " ";
                card02.innerHTML = " ";
                card01.disabled = false;
                card02.disabled = false;
                cardsUncovers = 0;
            }, 500)
        }
    };
    if(hits == 15){
        winAudio.play();
        playingAudio.pause();
        clearInterval(regresiveTime);
        showTime.innerHTML = ``;
        showHits.innerHTML = ``;
        showMovements.innerHTML = ``;
        showEndMsj.innerHTML = `<span class="end-msj-winner">BAD WINNER!</span>
                                <p class="end-msj-stats">YOR MAKE ${hits} HITS WITH ${movements} MOV IN ${startTimer - seconds} SECONDS!</p>`;
        resetButton.innerHTML = `<a class="reset-msj" onClick="window.location.reload(true)">Restart</a>`; 

    }
}