import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 20, 2];

const EDGE = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
};

const EDGENAME = {
  0: 'TOP',
  1: 'RIGHT',
  2: 'BOTTOM',
  3: 'LEFT',
};

class Tile {
  constructor(id, data) {
    this.id = id;
    this.data = data;

    // Original orientation edges
    this.edges = [
      data[0], // Top
      data.reduce((edge, _, i) => [...edge, data[i][data.length - 1]], []), // Right
      data[data.length - 1], // Bottom
      data.reduce((edge, _, i) => [...edge, data[i][0]], []), // Left
    ];

    this.edgeOrder = [EDGE.TOP, EDGE.RIGHT, EDGE.BOTTOM, EDGE.LEFT];

    this.connections = [];
  }

  print() {
    console.log(this.data.map((row) => row.join('')).join('\n'));
    console.log();
  }

  flipVertically() {
    this.data = this.data.reduce(
      (flipped, _, index) => [...flipped, this.data[this.data.length - 1 - index]],
      []
    );

    this.edges = [this.edges[2], this.edges[1], this.edges[0], this.edges[3]];
    //this.edgeOrder = [this.edgeOrder[2], this.edgeOrder[1], this.edgeOrder[0], this.edgeOrder[3]];
  }

  flipHorizontally() {
    this.data = this.data.map((row) => row.reverse());
    this.edges = [this.edges[0], this.edges[3], this.edges[2], this.edges[1]];
    // this.edgeOrder = [this.edgeOrder[0], this.edgeOrder[3], this.edgeOrder[2], this.edgeOrder[1]];
  }

  rotateClockwise(times) {
    for (let time = 0; time < times; time++) {
      this.data = this.data[0].map((_, index) => this.data.map((row) => row[index]).reverse());
      this.edgeOrder = [this.edgeOrder.pop(), ...this.edgeOrder];
      this.edges = [this.edges.pop(), ...this.edges];

      this.connections.forEach((conn) => (conn.edge = (conn.edge + 1) % 4));
    }
  }

  rotateCounterClockwise(times) {
    for (let time = 0; time < times; time++) {
      this.data = this.data[0].map((_, index) =>
        this.data.map((row) => row[row.length - 1 - index])
      );

      //const top = this.edgeOrder.shift();
      //this.edgeOrder = [...this.edgeOrder, top];

      const first = this.edges.shift();
      this.edges = [...this.edges, first];

      this.connections.forEach((conn) => {
        conn.edge--;

        if (conn.edge < 0) conn.edge = 3;
      });
    }
  }
}

class Connection {
  constructor(edge, flipped, connectedTile, connectedEdge, connectedFlipped) {
    this.edge = edge;
    this.flipped = flipped;
    this.connectedTile = connectedTile;
    this.connectedEdge = connectedEdge;
    this.connectedFlipped = connectedFlipped;
  }
}

const input = read(YEAR, DAY);
const tiles = [];
const tilesById = new Map();

for (let i = 0; i < input.length; i += 12) {
  const id = Number(input[i].match(/\d+/));
  const data = [];

  for (let j = i + 1; j < i + 11; j++) {
    data.push(input[j].split(''));
  }

  const tile = new Tile(id, data);
  tiles.push(tile);
  tilesById.set(id, tile);
}

const matches = new Map();

tiles.forEach((tile1) => {
  const tileMatches = new Set();

  tiles.forEach((tile2) => {
    if (tile2.id === tile1.id) return;

    let matched = false;

    for (const [i, edge1] of tile1.edges.entries()) {
      const e1F = edge1.join('');
      const e1R = edge1.reverse().join('');

      for (const [j, edge2] of tile2.edges.entries()) {
        const e2F = edge2.join('');
        const e2R = edge2.reverse().join('');

        if (e1F === e2F) {
          // no orientation change required
          tile1.connections.push(new Connection(i, false, tile2, j, false));
        } else if (e1F === e2R) {
          // edge2 is flipped
          tile1.connections.push(new Connection(i, false, tile2, j, true));
        } else if (e1R === e2F) {
          // edge1 is flipped
          tile1.connections.push(new Connection(i, true, tile2, j, false));
        }

        if (e1F === e2F || e1F === e2R || e1R === e2F) {
          matched = true;
          break;
        }
      }

      if (matched) {
        tileMatches.add(tile2.id);
        break;
      }
    }
  });

  matches.set(tile1.id, tileMatches);
});

const SIZE = Math.sqrt(tiles.length);
const grid = [...Array(SIZE)].map((_) => Array(SIZE).fill(null));

// Corner connection edges
// 0+1,1+2,2+3,3+0

// Find a corner to start in top left
const corners = tiles.filter((tile) => tile.connections.length === 2);
// corners.forEach((corner) => {
//   console.log(
//     corner.connections.map((conn) => `${EDGENAME[conn.edge]} -> ${conn.connectedTile.id}`)
//   );
// });

// corners.forEach((corner) => corner.rotateClockwise(1));

// corners.forEach((corner) => {
//   console.log(
//     corner.connections.map((conn) => `${EDGENAME[conn.edge]} -> ${conn.connectedTile.id}`)
//   );
// });
// process.exit();
let filtered;

do {
  filtered = corners.filter(
    (corner) =>
      corner.connections.filter((connection) => [EDGE.BOTTOM, EDGE.RIGHT].includes(connection.edge))
        .length === 2
  );

  if (filtered.length === 0) {
    tiles.forEach((tile) => tile.rotateClockwise(1));
  }
  console.log(filtered.length);
} while (filtered.length === 0);

grid[0][0] = filtered[0].id;

for (let row = 0; row < SIZE; row++) {
  for (let col = 0; col < SIZE; col++) {
    if (row === 0 && col === 0) continue;

    const leftTileId = col > 0 ? grid[row][col - 1] : null;
    const aboveTileId = row > 0 ? grid[row - 1][col] : null;

    if (leftTileId) {
      // get right connection from prev tile
      const tile = tilesById.get(leftTileId);
      const connectedTileId = tile.connections.filter((conn) => conn.edge === EDGE.RIGHT)[0]
        .connectedTile.id;

      grid[row][col] = connectedTileId;
    }

    if (aboveTileId) {
      // get bottom connection from above tile
      const tile = tilesById.get(aboveTileId);
      const connectedTileId = tile.connections.filter((conn) => conn.edge === EDGE.BOTTOM)[0]
        .connectedTile.id;

      grid[row][col] = connectedTileId;
    }
  }
}

console.log(grid);

write(YEAR, DAY, PART, '');
