import Ball from './CreateBall'

let ball = new Ball;
let arr = [];

document.querySelector('.action').addEventListener('click', () => {
  ball.createBall();
  ball.createBall();
  arr = ball.createBall();
  console.log(arr);
});