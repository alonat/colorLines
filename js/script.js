import Ball from './CreateBall.js'
import Line from './RemoveLine.js'
import Path from './FindPath.js'

/*let ballArray = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];*/

let ballArray = [
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 1, 0],
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
  let path = new Path(ballArray);
  path.getMinPath();
});

document.addEventListener('DOMContentLoaded', () => {
/*  ballArray = ball.createBallXY(0, 1, 0);
  ballArray = ball.createBallXY(0, 2, 0);
  ballArray = ball.createBallXY(0, 3, 0);
  ballArray = ball.createBallXY(0, 4, 4);
  ballArray = ball.createBallXY(0, 5, 4);
  ballArray = ball.createBallXY(0, 6, 4);

  ballArray = ball.createBallXY(2, 1, 3);
  ballArray = ball.createBallXY(3, 1, 3);
  ballArray = ball.createBallXY(4, 1, 3);
  ballArray = ball.createBallXY(5, 1, 2);
  ballArray = ball.createBallXY(6, 1, 2);
  ballArray = ball.createBallXY(7, 1, 2);*/

  /*ballArray = ball.createBallXY(6, 0, 2);
  ballArray = ball.createBallXY(7, 1, 2);
  ballArray = ball.createBallXY(8, 2, 2);

  ballArray = ball.createBallXY(0, 6, 2);
  ballArray = ball.createBallXY(1, 7, 2);
  ballArray = ball.createBallXY(2, 8, 2);*/

/*  ballArray = ball.createBallXY(0, 5, 4);
  ballArray = ball.createBallXY(1, 4, 4);
  ballArray = ball.createBallXY(2, 3, 4);
  ballArray = ball.createBallXY(3, 2, 5);
  ballArray = ball.createBallXY(4, 1, 5);
  ballArray = ball.createBallXY(5, 0, 5);

  ballArray = ball.createBallXY(8, 6, 6);
  ballArray = ball.createBallXY(7, 7, 6);
  ballArray = ball.createBallXY(6, 8, 6);*/
});