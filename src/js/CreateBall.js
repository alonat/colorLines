export default class Ball {
  constructor(ballArray, ballColors) {
    this.ballsContainer = document.querySelector('.balls-container');
    this.ballArray = ballArray;
    this.ballColors = ballColors;
    this.availablePosition = [];
  }

  getAvailablePosition() {
    this.availablePosition = [];
    for (let i = 0; i < this.ballArray.length; i += 1) {
      for (let j = 0; j < this.ballArray.length; j += 1) {
        if (!this.ballArray[i][j]) {
          this.availablePosition.push({ x: j, y: i });
        }
      }
    }
  }

  getRandomPosition() {
    this.getAvailablePosition();
    return this.availablePosition[Math.floor(Math.random() * this.availablePosition.length)];
  }

  createNBalls(n) {
    return Array(n).fill('').map(() => {
      return this.ballColors[Math.floor(Math.random() * this.ballColors.length)]
    });
  }

  createBallElement(ballColor, position) {
    const ball = document.createElement('div');
    const classes = ['ball', `ball-color-${ballColor}`];
    if (position) classes.push(`ball-position-${position.x + 1}-${position.y + 1}`)

    ball.setAttribute('class', classes.join(' '));

    return ball;
  }

  insertNBalls(ballsToInsert) {
    ballsToInsert.forEach((ballColor) => {
      const position = this.getRandomPosition();
      if (position) {
        const ball = this.createBallElement(ballColor, position);

        this.ballsContainer.appendChild(ball);
        this.ballArray[position.y][position.x] = ballColor;
      }
    });
    console.log(this.ballArray);
    return this.ballArray;
  }

  moveBallXY(oldCoord, newCoord) {
    const oldClass = `ball-position-${oldCoord[1] + 1}-${oldCoord[0] + 1}`;
    const newClass = `ball-position-${newCoord[1] + 1}-${newCoord[0] + 1}`;

    document.querySelector(`.${oldClass}`).classList.add(newClass);
    document.querySelector(`.${newClass}`).classList.remove(oldClass);

    this.ballArray[newCoord[0]][newCoord[1]] = this.ballArray[oldCoord[0]][oldCoord[1]];
    this.ballArray[oldCoord[0]][oldCoord[1]] = 0;

    return this.ballArray;
  }
}
