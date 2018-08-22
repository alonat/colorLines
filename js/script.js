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
  let path = new Path(ballArray, [0, 0]);

  let minPath = path.getMinPath([0,1]).join(' -> ');
  document.querySelector('.path').innerHTML = minPath.length > 0 ? minPath : 'No path'
});

document.addEventListener('DOMContentLoaded', () => {
  ballArray = ball.createBallXY(0, 0, 3);
  ballArray = ball.createBall();
  ballArray = ball.createBall();
});