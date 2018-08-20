export default class Ball {
  constructor (ballArray, ballColors) {
    this.ballsContainer = document.querySelector('.balls-container');
    this.ballArray = ballArray;
    this.ballColors = ballColors;
    this.availablePosition = []
  }

  getAvailablePosition () {
    this.availablePosition = []
    for (let i = 0; i < this.ballArray.length; i++) {
      for (let j = 0; j < this.ballArray.length; j++) {
        if (!this.ballArray[i][j]) {
          this.availablePosition.push(
            { x: i, y: j }
          )
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
    let classes = ['ball', `ball-color-${elementColor}`, `ball-position-${position.x + 1}-${position.y + 1}`];

    ball.setAttribute("class", classes.join(" "));

    this.ballsContainer.appendChild(ball);
    this.ballArray[position.x][position.y] = elementColor;

    return this.ballArray;
  }
}