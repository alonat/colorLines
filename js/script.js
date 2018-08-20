import Ball from './CreateBall.js'
import Line from './RemoveLine.js'

let ballArray = [
  ['blue', 0, 0, 0, 0, 0, 0, 0, 0],
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
let line;

document.querySelector('.action').addEventListener('click', () => {
  ball.createBall();
  ball.createBall();
  ballArray = ball.createBall();
  console.log(ballArray);
});

line = new Line(ballArray, ballColors);
document.querySelector('.findLine').addEventListener('click', () => {
  ballArray = line.findLine();
  console.log(ballArray);
});