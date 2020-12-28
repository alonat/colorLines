import Ball from './CreateBall.js';
import Line from './RemoveLine.js';
import Path from './FindPath.js';

import '../style/index.scss';

let ballArray = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ballColors = ['green', 'red', 'yellow', 'violet', 'blue', 'orange', 'pink'];

const ball = new Ball(ballArray, ballColors);

let nextBalls = ball.createNBalls(3);

let pathStart = [];
let pathEnd = [];
let path = [];

function addThreeBalls() {
  ballArray = ball.insertNBalls(nextBalls);
  nextBalls = ball.createNBalls(3);

  return ballArray;
}

function insertNextStepBall() {
  document.querySelector('.next-step').innerHTML = '';
  nextBalls.forEach((ballColor) => {
    document.querySelector('.next-step').append(ball.createBallElement(ballColor));
  })
}

function getPathCoord(target) {
  if (target.classList.contains('ball')) {
    const tmpClass = target.classList.item(2).split('-');
    pathStart = [tmpClass[3] - 1, tmpClass[2] - 1];
    pathEnd = [];
  } else {
    const xCoord = Math.round(target.offsetTop / target.clientHeight);
    const yCoord = Math.round(target.offsetLeft / target.clientWidth);
    pathEnd = [xCoord, yCoord];
  }
}

function getPath(arr) {
  if (pathStart.length > 0 && pathEnd.length > 0) {
    const currPath = new Path(arr, pathStart);

    path = currPath.getMinPath(pathEnd);

    pathStart = [];
    pathEnd = [];
  }
}

async function makeStep() {
  if (path.length > 0) {
    const delay = (ms) => new Promise((_) => setTimeout(_, ms));
    for (let i = 1; i < path.length; i += 1) {
      ballArray = ball.moveBallXY(path[i - 1], path[i]);
      // eslint-disable-next-line no-await-in-loop
      await delay(300);
    }

    path = [];

    const line = new Line(ballArray, ballColors);
    let removedAmount;
    [ballArray, removedAmount] = line.findLine();
    if (removedAmount < 1) {
      ballArray = addThreeBalls();
      insertNextStepBall()
    }
  }

  return ballArray;
}

document.addEventListener('DOMContentLoaded', () => {
  ballArray = addThreeBalls();
  insertNextStepBall();
});

document.querySelector('.game-container').addEventListener('click', async ({ target }) => {
  getPathCoord(target);
  getPath(ballArray);
  ballArray = await makeStep();
});
