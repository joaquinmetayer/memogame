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

// audios
let winAudio = new Audio("./assets/sound/win.wav");
let loseAudio = new Audio("./assets/sound/lose.wav");
let clickAudio = new Audio("./assets/sound/click.wav");
let rightAudio = new Audio("./assets/sound/right.wav");
let wrongAudio = new Audio("./assets/sound/wrong.wav");
let timeAudio = new Audio("./assets/sound/time.wav");
let playingAudio = new Audio("./assets/sound/playing.mp3");
let startSoundAudio = new Audio("./assets/sound/start.wav");

// a document html
let showMovements = document.getElementById("movements");
let showHits = document.getElementById("hits");
let showTime = document.getElementById("time");
let showEndMsj = document.getElementById("end-msj");
let resetButton = document.getElementById("restart-game");

// add events
document.getElementById("0").onclick = () => uncover(0);
document.getElementById("1").onclick = () => uncover(1);
document.getElementById("2").onclick = () => uncover(2);
document.getElementById("3").onclick = () => uncover(3);
document.getElementById("4").onclick = () => uncover(4);
document.getElementById("5").onclick = () => uncover(5);
document.getElementById("6").onclick = () => uncover(6);
document.getElementById("7").onclick = () => uncover(7);
document.getElementById("8").onclick = () => uncover(8);
document.getElementById("9").onclick = () => uncover(9);
document.getElementById("10").onclick = () => uncover(10);
document.getElementById("11").onclick = () => uncover(11);
document.getElementById("12").onclick = () => uncover(12);
document.getElementById("13").onclick = () => uncover(13);
document.getElementById("14").onclick = () => uncover(14);
document.getElementById("15").onclick = () => uncover(15);
document.getElementById("16").onclick = () => uncover(16);
document.getElementById("17").onclick = () => uncover(17);
document.getElementById("18").onclick = () => uncover(18);
document.getElementById("19").onclick = () => uncover(19);
document.getElementById("20").onclick = () => uncover(20);
document.getElementById("21").onclick = () => uncover(21);
document.getElementById("22").onclick = () => uncover(22);
document.getElementById("23").onclick = () => uncover(23);
document.getElementById("24").onclick = () => uncover(24);
document.getElementById("25").onclick = () => uncover(25);
document.getElementById("26").onclick = () => uncover(26);
document.getElementById("27").onclick = () => uncover(27);
document.getElementById("28").onclick = () => uncover(28);
document.getElementById("29").onclick = () => uncover(29);

// numbers
let numbers = [
  0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
  12, 12, 13, 13, 14, 14,
];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});
console.log(numbers);

// main function
function uncover(id) {
  // starting timer
  if (timer == false) {
    countTime();
    timer = true;
  }

  // count cards
  cardsUncovers++;

  console.log(`HEEEE, WHAT DO YOU SEE? PLAY THE GAME 👀`);

  if (cardsUncovers == 1) {
    // show first card
    card01 = document.getElementById(id);
    firstResult = numbers[id];
    card01.innerHTML = `<img src="./assets/img/${firstResult}.png">`;

    clickAudio.play();

    // disable first card
    card01.disabled = true;
  } else if (cardsUncovers == 2) {
    // show second card
    card02 = document.getElementById(id);
    secondResult = numbers[id];
    card02.innerHTML = `<img src="./assets/img/${secondResult}.png">`;

    // disable second cards
    card02.disabled = true;

    // add movements in counter
    movements++;
    showMovements.innerHTML = `MOV ${movements}`;

    // comparing cards for mach
    if (firstResult == secondResult) {
      // to cero cards uncover
      cardsUncovers = 0;

      // add hits
      hits++;
      showHits.innerHTML = `HIT ${hits}`;

      rightAudio.play();
    } else {
      wrongAudio.play();

      // show timeout
        setTimeout(() => {
          card01.innerHTML = " ";
          card02.innerHTML = " ";
          card01.disabled = false;
          card02.disabled = false;
          cardsUncovers = 0;
        }, 500);
    }
  }
  // winner message
  if (hits == 15) {
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

// functions
function countTime() {
  playingAudio.play();
  regresiveTime = setInterval(() => {
    seconds--;
    timeAudio.play();
    showTime.innerHTML = `TIM ${seconds}`;
    if (seconds == 0) {
      clearInterval(regresiveTime);
      blockCards();
      loseAudio.play();
      playingAudio.pause();
      showHits.innerHTML = ``;
      showMovements.innerHTML = ``;
      showTime.innerHTML = ``;
      showEndMsj.innerHTML = `<span class="end-msj-looser">GOOD LOSER!</span>`;
      resetButton.innerHTML = `<a class="reset-msj" onClick="buttonRestartAction()">Restart</a>`;
      card01.disabled = false;
      card02.disabled = false;
      cardsUncovers = 0;
    }
  }, 1100);
}
function blockCards() {
  for (let i = 0; i <= 29; i++) {
    let cardBlock = document.getElementById(i);
    cardBlock.disabled = true;
    cardBlock.innerHTML = `<img src="./assets/img/${numbers[i]}.png">`;
    card02.innerHTML = `<img src="./assets/img/${secondResult}.png">`;
    card01.innerHTML = `<img src="./assets/img/${firstResult}.png">`;
  }
}
function startSound() {
  startSoundAudio.play();
}
function buttonRestartAction() {
  startSoundAudio.play();
  window.location.reload(true);
}
