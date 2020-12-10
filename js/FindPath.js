export default class FindPath {
  constructor(ballArray, start) {
    this.board = ballArray;
    this.boardSize = this.board.length;
    this.matrix = this.makeAdjacencyMatrix();
    this.start = start;
    this.fromNode = this.getNodeNumber(...this.start);
  }

  getNodeNumber(i, j) {
    return i * this.boardSize + j;
  }

  getNodeCoord(number) {
    return [Number(Math.floor(number / this.boardSize)), number % this.boardSize];
  }

  makeAdjacencyMatrix() {
    const n = this.boardSize * this.boardSize;
    const matrix = [];

    for (let i = 0; i < n; i += 1) {
      matrix.push(new Array(n).fill(0));
    }

    for (let i = 0; i < this.boardSize; i += 1) {
      for (let j = 0; j < this.boardSize; j += 1) {
        const x = i * this.boardSize + j;

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

  removeFilledNode(i, j) {
    const nodeNumber = this.getNodeNumber(i, j);

    for (let k = 0; k < this.boardSize * this.boardSize; k += 1) {
      if (nodeNumber !== this.fromNode) {
        this.matrix[nodeNumber][k] = 0;
        this.matrix[k][nodeNumber] = 0;
      }
    }
  }

  removeAllFilledNodes() {
    for (let i = 0; i < this.boardSize; i += 1) {
      for (let j = 0; j < this.boardSize; j += 1) {
        if (this.board[i][j]) {
          this.removeFilledNode(i, j);
        }
      }
    }
  }

  bfs(i, j) {
    const queue = [];
    const nodeNumber = this.getNodeNumber(i, j);
    queue.push(nodeNumber);
    const used = new Array(this.boardSize * this.boardSize).fill(false);
    const path = new Array(this.boardSize * this.boardSize).fill(-1);
    used[nodeNumber] = true;

    while (queue.length > 0) {
      const v = queue.shift();

      for (let k = 0; k < this.matrix[v].length; k += 1) {
        if (this.matrix[v][k] === 1) {
          const to = k;

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

  getMinPath(end) {
    this.removeAllFilledNodes();
    const path = this.bfs(...this.start);
    let to = this.getNodeNumber(...end);
    const pathEdges = [];

    pathEdges.push(this.getNodeCoord(to));
    if (path[to] === -1) {
      return [];
    }
    while (to !== this.fromNode) {
      to = path[to];
      pathEdges.push(this.getNodeCoord(to));
    }

    return pathEdges.reverse();
  }
}
