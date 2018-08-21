import Ball from './CreateBall.js'
import Line from './RemoveLine.js'

let ballArray = [
  ['blue', 0, 'green', 'green', 'green', 0, 0, 0, 0],
  [0, 'red', 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 'red', 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 'red', 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 'red', 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 'red', 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 'yellow', 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let ballColors = ['green', 'red', 'yellow', 'violet', 'blue', 'orange', 'pink'];

let ball = new Ball(ballArray, ballColors);
let line = new Line(ballColors);

document.querySelector('.action').addEventListener('click', () => {
  ball.createBall();
  ball.createBall();
  ballArray = ball.createBall();
});

document.querySelector('.findLine').addEventListener('click', () => {
  line.findLine(ballArray);
});

document.addEventListener('DOMContentLoaded', () => {
  ball.createBall();
  ball.createBall();
  ballArray = ball.createBall();
})