export default class FindPath {
  constructor (ballArray, start) {
    this.board = ballArray;
    this.boardSize = this.board.length;
    this.matrix = this.makeAdjacencyMatrix();
    this.start = start;
    this.fromNode = this.getNodeNumber(...this.start);
  }

  getNodeNumber (i, j) {
    return i * this.boardSize + j;
  }

  getNodeCoord (number) {
    return [Number(Math.floor(number / this.boardSize)), number % this.boardSize]
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
      if (nodeNumber !== this.fromNode) {
        this.matrix[nodeNumber][i] = 0;
        this.matrix[i][nodeNumber] = 0;
      }
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

  bfs (i, j) {
    let queue = [];
    let nodeNumber = this.getNodeNumber(i, j);
    queue.push(nodeNumber);
    let used = new Array(this.boardSize * this.boardSize).fill(false);
    let path = new Array(this.boardSize * this.boardSize).fill(-1);
    used[nodeNumber] = true;

    while (queue.length > 0) {
      let v = queue.shift();

      for (let i = 0; i < this.matrix[v].length; i++) {
        if (this.matrix[v][i] === 1) {
          let to = i;

          if (!used[to]) {
            used[to] = true;
            queue.push(to);
            path[to] = v;
          }
        }
      }
    }

    return path;
  }

  getMinPath (end) {
    this.removeAllFilledNodes();
    let path = this.bfs(...this.start);
    let to = this.getNodeNumber(...end);
    let pathEdges = [];

    pathEdges.push(this.getNodeCoord(to));
    if (path[to] === -1) {
      return []
    }
    while (to !== this.fromNode) {
      to = path[to];
      pathEdges.push(this.getNodeCoord(to));
    }

    return pathEdges.reverse();
  }
}