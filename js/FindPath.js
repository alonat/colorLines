export default class FindPath {
  constructor (ballArray) {
    this.board = ballArray;
    this.boardSize = 4; //this.board.length
    this.matrix = this.makeAdjacencyMatrix();
  }

  getNodeNumber (i, j) {
    return i * this.boardSize + j;
  }

  makeAdjacencyMatrix () {
    let n = this.boardSize * this.boardSize;
    let matrix = [];

    for (let i = 0; i < n; i++) {
      matrix.push(new Array(n).fill(0));
    }

    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        let x = i * this.boardSize + j;

        if (j > 0) {
          matrix[x - 1][x] = 1;
          matrix[x][x - 1] = 1;
        }

        if (i > 0) {
          matrix[x - this.boardSize][x] = 1;
          matrix[x][x - this.boardSize] = 1;
        }
      }
    }
    return matrix;
  }

  removeFilledNode (i, j) {
    let nodeNumber = this.getNodeNumber(i, j);

    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      this.matrix[nodeNumber][i] = 0;
      this.matrix[i][nodeNumber] = 0;
    }
  }

  removeAllFilledNodes () {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[i][j]) {
          this.removeFilledNode(i, j);
        }
      }
    }
  }

  getMinPath () {
    this.removeAllFilledNodes();
    let t = this.matrix;
    let h = [];
    for (let i = 0; i < 16; i++) {
      h.push(t[i].join(','));
    }
    console.log(h.join(`\n`));
  }
}