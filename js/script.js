import Ball from './CreateBall.js'
import Line from './RemoveLine.js'
import Path from './FindPath.js'

let ballArray = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let ballColors = ['green', 'red', 'yellow', 'violet', 'blue', 'orange', 'pink'];

let ball = new Ball(ballArray, ballColors);

let pathStart = [];
let pathEnd = [];
let path = [];

document.querySelector('.action').addEventListener('click', () => {
  ball.createBall();
  ball.createBall();
  ballArray = ball.createBall();
});

document.querySelector('.findLine').addEventListener('click', () => {
  let line = new Line(ballArray, ballColors);
  ballArray = line.findLine();
});

document.querySelector('.findPath').addEventListener('click', () => {
  getPath();
});

document.addEventListener('DOMContentLoaded', () => {
  ballArray = addThreeBalls();
});

document.querySelector('.game-container').addEventListener('click', async ({ target }) => {
  getPathCoord(target);
  getPath(ballArray);
  ballArray = await buildPath();
});

function addThreeBalls () {
  for (let i = 0; i < 3; i++) {
    ballArray = ball.createBall();
  }
  console.log(ballArray);

  return ballArray;
}

function getPathCoord (target) {
  if (target.classList.contains('ball')) {
    let tmpClass = target.classList.item(2).split('-');
    pathStart = [tmpClass[3] - 1, tmpClass[2] - 1];
    pathEnd = [];
  } else {
    let xCoord = Math.round(target.offsetTop / target.clientHeight);
    let yCoord = Math.round(target.offsetLeft / target.clientWidth);
    pathEnd = [xCoord, yCoord];
  }
}

function getPath (ballArray) {
  if (pathStart.length > 0 && pathEnd.length > 0) {
    let currPath = new Path(ballArray, pathStart);

    path = currPath.getMinPath(pathEnd);
    let minPath = path.join(' -> ');
    document.querySelector('.path').innerHTML = minPath.length > 0 ? minPath : 'No path';

    pathStart = [];
    pathEnd = [];
  }
}

async function buildPath () {
  if (path.length > 0) {
    const delay = ms => new Promise(_ => setTimeout(_, ms));
    for (let i = 1; i < path.length; i++) {
      ballArray = ball.moveBallXY(path[i - 1], path[i]);
      await delay(300);
    }

    path = [];
  }

  return ballArray;
}