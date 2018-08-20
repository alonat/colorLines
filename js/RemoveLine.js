export default class RemoveLine {
  constructor (ballArray, ballColors) {
    this.ballArray = ballArray;
    this.ballColors = ballColors;
    this.tmpLine = [];
    this.ballsContainer = document.querySelector('.balls-container');
    this.amountToDelete = 3;
  }

  findHorizontalLine () {
    for (let i = 0; i < this.ballArray.length; i++) {
      this.tmpLine = [];

      for (let j = 0; j < this.ballArray.length; j++) {
        if (this.ballArray[i][j] &&
           (this.ballArray[i][j] === this.ballArray[i][j + 1] ||
            this.ballArray[i][j] === this.ballArray[i][j - 1] )) {
          this.tmpLine.push({i: j, j: i});
        } else if (this.tmpLine.length <= this.amountToDelete) {
          this.tmpLine = [];
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls();
    }
    return this.ballArray;
  }

  findVerticalLine () {
    for (let j = 0; j < this.ballArray.length; j++) {
      this.tmpLine = [];

      for (let i = 0; i < this.ballArray.length; i++) {
        if (this.ballArray[i][j] &&
          (this.ballArray[i + 1] && this.ballArray[i][j] === this.ballArray[i + 1][j] ||
            this.ballArray[i - 1] && this.ballArray[i][j] === this.ballArray[i - 1][j] )) {
          this.tmpLine.push({i: j, j: i});
        } else if (this.tmpLine.length <= this.amountToDelete) {
          this.tmpLine = [];
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls();
    }
    return this.ballArray;
  }

  findLoopDiagonalLine () {
    let i = 0;
    for (let k = 0; k < this.ballArray.length; k++) {
      this.tmpLine = [];
      for (let j = 0; j <= k; j++) {
        i = k - j;

        if (this.ballArray[i][j] &&
          (this.ballArray[i - 1] && this.ballArray[i][j] === this.ballArray[i - 1][j + 1] ||
            this.ballArray[i + 1] && this.ballArray[i][j] === this.ballArray[i + 1][j - 1] )) {

          this.tmpLine.push({i: j, j: i});
        } else if (this.tmpLine.length <= this.amountToDelete) {
          this.tmpLine = [];
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls();
    }

    for (let k = this.ballArray.length - 2; k >= 0; k--) {
      this.tmpLine = [];
      for (let j = 0; j <= k; j ++) {
        i = k - j;

        if (this.ballArray[i][j] &&
            (this.ballArray[i - 1] && this.ballArray[i][j] === this.ballArray[i - 1][j + 1] ||
            this.ballArray[i + 1] && this.ballArray[i][j] === this.ballArray[i + j][j - 1] )) {

          this.tmpLine.push({i: j, j: i});
        } else if (this.tmpLine.length <= this.amountToDelete) {
          this.tmpLine = [];
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls();
    }

    return this.ballArray;
  }

  findMainDiagonalLine () {
    let i = 0;
    for (let k = this.ballArray.length - 1; k >= 0; k--) {
      this.tmpLine = [];
      for (let j = k; j <= this.ballArray.length - 1; j++) {
        i = j - k;

        if (this.ballArray[i][j] &&
          (this.ballArray[i + 1] && this.ballArray[i][j] === this.ballArray[i + 1][j + 1] ||
            this.ballArray[i - 1] && this.ballArray[i][j] === this.ballArray[i - 1][j - 1] )) {

          this.tmpLine.push({i: i, j: j});
        } else if (this.tmpLine.length <= this.amountToDelete) {
          this.tmpLine = []
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls();
    }

    for (let k = 1; k < this.ballArray.length; k++) {
      this.tmpLine = [];
      for (let j = 0; j <= this.ballArray.length - 1 - k; j++) {
        i = k + j;

        if (this.ballArray[i][j] &&
            (this.ballArray[i + 1] && this.ballArray[i][j] === this.ballArray[i + 1][j + 1] ||
            this.ballArray[i - 1] && this.ballArray[i][j] === this.ballArray[i - j][j - 1] )) {

          this.tmpLine.push({i: i, j: j});
        } else if (this.tmpLine.length <= this.amountToDelete) {
          this.tmpLine = []
        }
      }
      this.tmpLine.length >= this.amountToDelete && this.removeBalls();
    }

    return this.ballArray;
  }

  removeBalls () {
    this.tmpLine.map((el) => {
      this.ballsContainer.childNodes.forEach(item => {
        if (item.classList.contains(`ball-position-${el.j + 1}-${el.i + 1}`)) {
          this.ballsContainer.removeChild(item);
        }
      });

      return this.ballArray[el.i][el.j] = 0;
    });
  }

  findLine() {
    this.findHorizontalLine();
    this.findVerticalLine();
    this.findMainDiagonalLine();
    this.findLoopDiagonalLine();

    return this.ballArray;
  }
}