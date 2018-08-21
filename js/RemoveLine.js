export default class RemoveLine {
  constructor (ballArray, ballColors) {
    this.ballColors = ballColors;
    this.tmpLine = [];
    this.ballsContainer = document.querySelector('.balls-container');
    this.amountToDelete = 3;
  }

  findHorizontalLine (ballArray) {
    for (let i = 0; i < ballArray.length; i++) {
      this.tmpLine = [];

      for (let j = 0; j < ballArray.length; j++) {
        if (ballArray[i][j] &&
           (ballArray[i][j] === ballArray[i][j + 1] ||
            ballArray[i][j] === ballArray[i][j - 1] )) {
          this.tmpLine.push({i: i, j: j});
        } else if (this.tmpLine.length < this.amountToDelete) {
          this.tmpLine = [];
        }
      }

      this.tmpLine.length >= this.amountToDelete && this.removeBalls(ballArray);
    }
    return ballArray;
  }

  findVerticalLine (ballArray) {
    for (let j = 0; j < ballArray.length; j++) {
      this.tmpLine = [];

      for (let i = 0; i < ballArray.length; i++) {
        this.tmpLine.push(ballArray[i][j]);
        if (ballArray[i][j] &&
          (ballArray[i + 1] && ballArray[i][j] === ballArray[i + 1][j] ||
            ballArray[i - 1] && ballArray[i][j] === ballArray[i - 1][j] )) {
          this.tmpLine.push({i: i, j: j});
          console.log(ballArray[i][j]);
        } else if (this.tmpLine.length < this.amountToDelete) {
          this.tmpLine = [];
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls(ballArray);
    }
    return ballArray;
  }

  findLoopDiagonalLine (ballArray) {
    let i = 0;
    for (let k = 0; k < ballArray.length; k++) {
      this.tmpLine = [];
      for (let j = 0; j <= k; j++) {
        i = k - j;

        if (ballArray[i][j] &&
          (ballArray[i - 1] && ballArray[i][j] === ballArray[i - 1][j + 1] ||
            ballArray[i + 1] && ballArray[i][j] === ballArray[i + 1][j - 1] )) {

          this.tmpLine.push({i: j, j: i});
        } else if (this.tmpLine.length < this.amountToDelete) {
          this.tmpLine = [];
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls(ballArray);
    }

    for (let k = ballArray.length - 2; k >= 0; k--) {
      this.tmpLine = [];
      for (let j = 0; j <= k; j ++) {
        i = k - j;

        if (ballArray[i][j] &&
            (ballArray[i - 1] && ballArray[i][j] === ballArray[i - 1][j + 1] ||
            ballArray[i + 1] && ballArray[i][j] === ballArray[i + j][j - 1] )) {

          this.tmpLine.push({i: j, j: i});
        } else if (this.tmpLine.length < this.amountToDelete) {
          this.tmpLine = [];
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls(ballArray);
    }

    return ballArray;
  }

  findMainDiagonalLine (ballArray) {
    let i = 0;
    for (let k = ballArray.length - 1; k >= 0; k--) {
      this.tmpLine = [];
      for (let j = k; j <= ballArray.length - 1; j++) {
        i = j - k;

        if (ballArray[i][j] &&
          (ballArray[i + 1] && ballArray[i][j] === ballArray[i + 1][j + 1] ||
            ballArray[i - 1] && ballArray[i][j] === ballArray[i - 1][j - 1] )) {

          this.tmpLine.push({i: i, j: j});
        } else if (this.tmpLine.length < this.amountToDelete) {
          this.tmpLine = []
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls(ballArray);
    }

    for (let k = 1; k < ballArray.length; k++) {
      this.tmpLine = [];
      for (let j = 0; j <= ballArray.length - 1 - k; j++) {
        i = k + j;

        if (ballArray[i][j] &&
            (ballArray[i + 1] && ballArray[i][j] === ballArray[i + 1][j + 1] ||
            ballArray[i - 1] && ballArray[i][j] === ballArray[i - j][j - 1] )) {

          this.tmpLine.push({i: i, j: j});
        } else if (this.tmpLine.length < this.amountToDelete) {
          this.tmpLine = []
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls(ballArray);
    }

    return ballArray;
  }

  removeBalls (ballArray) {
    console.log(this.tmpLine);
    this.tmpLine.map((el) => {
      console.log(el);
      this.ballsContainer.childNodes.forEach(item => {
        if (item.classList.contains(`ball-position-${el.j + 1}-${el.i + 1}`)) {
          this.ballsContainer.removeChild(item);
        }
      });
      return ballArray[el.i][el.j] = 0;
    });
  }

  findLine(ballArray) {
    //this.findHorizontalLine(ballArray);
    this.findVerticalLine(ballArray);
    //this.findMainDiagonalLine(ballArray);
    //this.findLoopDiagonalLine(ballArray);

    return ballArray;
  }
}