export default class Ball {
  constructor (ballArray, ballColors) {
    this.ballsContainer = document.querySelector('.balls-container');
    this.ballArray = ballArray;
    this.ballColors = ballColors;
    this.availablePosition = [];
  }

  getAvailablePosition () {
    this.availablePosition = [];
    for (let i = 0; i < this.ballArray.length; i++) {
      for (let j = 0; j < this.ballArray.length; j++) {
        if (!this.ballArray[i][j]) {
          this.availablePosition.push(
            { x: j, y: i }
          );
        }
      }
    }
  }

  getRandomPosition () {
    this.getAvailablePosition();
    return this.availablePosition[Math.floor(Math.random() * this.availablePosition.length)];
  }

  createBall () {
    let ball = document.createElement("div");
    let elementColor = this.ballColors[Math.floor(Math.random() * this.ballColors.length)];
    let position = this.getRandomPosition();
    if (position) {
      let classes = ['ball', `ball-color-${elementColor}`, `ball-position-${position.x + 1}-${position.y + 1}`];

      ball.setAttribute("class", classes.join(" "));

      this.ballsContainer.appendChild(ball);
      this.ballArray[position.y][position.x] = elementColor;

      return this.ballArray;
    }
    return [];
  }

  createBallXY (x, y, color) {
    let ball = document.createElement("div");
    let elementColor = this.ballColors[color];
    let classes = ['ball', `ball-color-${elementColor}`, `ball-position-${x + 1}-${y + 1}`];

    ball.setAttribute("class", classes.join(" "));

    this.ballsContainer.appendChild(ball);
    this.ballArray[y][x] = elementColor;

    return this.ballArray;
  }
}