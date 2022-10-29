// @ts-nocheck
"use strict";
// selecting elements using DOM method.
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnOver = document.querySelector(".btn--over");

// definitions
let scores, currentScore, activePlayer, playing;

// initialization function
// can also be used to reset the game
const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = currentScore;
    current1El.textContent = currentScore;
    diceEl.classList.add("hidden");
};
init();
// toggle function to remove elements from on screen on certain events
const toggleRemove = () => {
    // buttons selected by DOM elements stored in a array
    const elements = [diceEl, btnHold, btnRoll, btnOver];
    elements.forEach((element) => {
        element.classList.toggle("hidden");
    });
};
// event to reset the game
btnNew.onclick = () => {
    // removing elements from screen
    toggleRemove();
    // Invoking re initialization
    init();
    // removing player--winner class form the winner's element
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--winner");
    // setting player-1 as active
    player0El.classList.add("player--active");
};
// function used to switch the active player on turn
const playerSwitch = () => {
    // timeout function to set delay execution
    setTimeout(() => {
        // on switch dice will be hidden
        diceEl.classList.toggle("hidden");
    }, 1000);

    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    // ternary operator for switching player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // changing classes for active player
    player0El.classList.toggle("player--active"); // toggle can be used to both add and remove classes
    player1El.classList.toggle("player--active"); // if class already exists, will be removed || if doesn't exist will be added to the classlist
};
// event to roll the dice
btnRoll.onclick = () => {
    // generation random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // dice display
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");
    // check for rolled 1
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
    } else {
        // switch player
        playerSwitch();
    }
};

// hold the score
btnHold.onclick = () => {
    // add current score to player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
    // check the scores of current player
    if (scores[activePlayer] >= 120) {
        // console.log("winner");
        // winner
        playing = false; // game has been stopped
        toggleRemove(); // elements removed
        // adding styles to the winners side
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("player--winner");
        document.getElementById(`current--${activePlayer}`).textContent =
            "Winner🎉";
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");
    }
    // switch player
    else playerSwitch();
};
