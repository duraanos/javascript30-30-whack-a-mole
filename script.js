'use strict';

const scoreBoard = document.querySelector('.score');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const btnStart = document.querySelector('button');
let score = 0;
let lastHole;
let timeUp = false;

const randomTime = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

const randomHoles = function (holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (hole === lastHole) {
    console.log('Ah nah that is same one bud!');
    return randomHoles(holes);
  }

  lastHole = hole;
  return hole;
};

const peep = function () {
  const time = randomTime(200, 1000);
  const hole = randomHoles(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
};

const bonk = function (e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
};

const startGame = function () {
  scoreBoard.textContent = '';
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
};

moles.forEach(mole => mole.addEventListener('click', bonk));
