export default class RemoveLine {
  constructor (ballArray, ballColors) {
    this.ballColors = ballColors;
    this.tmpLine = [];
    this.tmpColor = '';
    this.ballsContainer = document.querySelector('.balls-container');
    this.amountToDelete = 5;
    this.ballArray = ballArray;
    this.HORIZONTAL_DIR = [0, 1, 0, -1];
    this.VERTICAL_DIR = [1, 0, -1, 0];
    this.LOOP_DIAGONAL_DIR = [-1, 1, 1, -1];
    this.MAIN_DIAGONAL_DIR = [1, 1, -1, -1];
    this.removedAmount = 0;
  }

  check (i, j, dir) {
    let result = true;
    let checkNeighbor = (
      this.ballArray[i + dir[0]] && this.ballArray[i][j] === this.ballArray[i + dir[0]][j + dir[1]] ||
      this.ballArray[i + dir[2]] && this.ballArray[i][j] === this.ballArray[i + dir[2]][j + dir[3]]
    );

    result &= Boolean(this.ballArray[i][j]);
    result &= checkNeighbor;

    return result;
  }

  findHorizontalLine () {
    for (let i = 0; i < this.ballArray.length; i++) {
      this.tmpLine = [];
      this.tmpColor = '';

      for (let j = 0; j < this.ballArray.length; j++) {
        if (this.check(i, j, this.HORIZONTAL_DIR)) {
          if (this.tmpColor !== '' && this.tmpColor !== this.ballArray[i][j]) {
            this.removeBalls();
          }
          this.tmpLine.push({i: i, j: j});
          this.tmpColor = this.ballArray[i][j];
        } else {
          this.removeBalls();
        }
      }

      this.removeBalls();
    }
  }

  findVerticalLine () {
    for (let j = 0; j < this.ballArray.length; j++) {
      this.tmpLine = [];
      this.tmpColor = '';
      for (let i = 0; i < this.ballArray.length; i++) {
        if (this.check(i, j, this.VERTICAL_DIR)) {
          if (this.tmpColor !== '' && this.tmpColor !== this.ballArray[i][j]) {
            this.removeBalls();
          }
          this.tmpLine.push({i: i, j: j });
          this.tmpColor = this.ballArray[i][j];
        } else {
          this.removeBalls();
        }
      }

      this.removeBalls();
    }
  }

  findLoopDiagonalLine () {
    let i = 0;
    for (let k = 0; k < this.ballArray.length; k++) {
      this.tmpLine = [];
      this.tmpColor = '';
      for (let j = 0; j <= k; j++) {
        i = k - j;

        if (this.check(i, j, this.LOOP_DIAGONAL_DIR)) {
          if (this.tmpColor !== '' && this.tmpColor !== this.ballArray[i][j]) {
            this.removeBalls();
          }
          this.tmpLine.push({i: i, j: j});
          this.tmpColor = this.ballArray[i][j];
        } else {
          this.removeBalls();
        }
      }

      this.removeBalls();
    }

    for (let k = this.ballArray.length - 2; k >= 0; k--) {
      this.tmpLine = [];
      this.tmpColor = '';
      for (let j = 0; j <= k; j ++) {
        i = k - j;

        if (this.check(this.ballArray.length - j - 1, this.ballArray.length - i - 1, this.LOOP_DIAGONAL_DIR)) {
          if (this.tmpColor !== '' &&
              this.tmpColor !== this.ballArray[this.ballArray.length - j - 1][this.ballArray.length - i - 1]) {
            this.removeBalls();
          }
          this.tmpLine.push({i: this.ballArray.length - j - 1, j: this.ballArray.length - i - 1});
          this.tmpColor = this.ballArray[this.ballArray.length - j - 1][this.ballArray.length - i - 1];
        } else {
          this.removeBalls();
        }
      }

      this.removeBalls();
    }
  }

  findMainDiagonalLine () {
    let i = 0;
    for (let k = this.ballArray.length - 1; k >= 0; k--) {
      this.tmpLine = [];
      this.tmpColor = '';
      for (let j = k; j <= this.ballArray.length - 1; j++) {
        i = j - k;

        if (this.check(i, j, this.MAIN_DIAGONAL_DIR)) {
          if (this.tmpColor !== '' && this.tmpColor !== this.ballArray[i][j]) {
            this.removeBalls();
          }
          this.tmpLine.push({i: i, j: j});
          this.tmpColor = this.ballArray[i][j];
        } else {
          this.removeBalls();
        }
      }

      this.removeBalls();
    }

    for (let k = 1; k < this.ballArray.length; k++) {
      this.tmpLine = [];
      this.tmpColor = '';
      for (let j = 0; j <= this.ballArray.length - 1 - k; j++) {
        i = k + j;

        if (this.check(i, j, this.MAIN_DIAGONAL_DIR)) {
          if (this.tmpColor !== '' && this.tmpColor !== this.ballArray[i][j]) {
            this.removeBalls();
          }
          this.tmpLine.push({i: i, j: j});
          this.tmpColor = this.ballArray[i][j];
        } else {
          this.removeBalls();
        }
    }

      this.removeBalls();
    }
  }

  removeBalls () {
    if (this.tmpLine.length < this.amountToDelete) {
      this.tmpLine = [];
      this.tmpColor = '';
      return;
    }
    this.tmpLine.forEach((el) => {
      this.ballsContainer.childNodes.forEach(item => {
        if (item.classList.contains(`ball-position-${el.j + 1}-${el.i + 1}`)) {
          this.ballsContainer.removeChild(item);
        }
      });
      this.ballArray[el.i][el.j] = 0;
    });
    this.tmpLine = [];
    this.tmpColor = '';
    this.removedAmount++;
  }

  findLine() {
    this.findHorizontalLine();
    this.findVerticalLine();
    this.findMainDiagonalLine();
    this.findLoopDiagonalLine();

    return [this.ballArray, this.removedAmount];
  }
}