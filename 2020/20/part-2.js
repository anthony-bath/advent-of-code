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

    this.connections = [];
  }

  print() {
    console.log(this.data.map((row) => row.join('')).join('\n'));
    console.log();
  }

  printConnections() {
    console.log(this.connections.map((conn) => `${EDGENAME[conn.edge]} -> ${conn.tile.id}`));
  }

  removeBorders() {
    this.data = this.data.reduce((borderless, row, index) => {
      if (index === 0 || index === this.data.length - 1) return borderless;
      return [...borderless, row.slice(1, row.length - 1)];
    }, []);
  }

  flipVertically() {
    this.data = this.data.reduce(
      (flipped, _, index) => [...flipped, this.data[this.data.length - 1 - index]],
      []
    );

    this.edges = [this.edges[2], this.edges[1], this.edges[0], this.edges[3]];
    this.connections.forEach((conn) => {
      if (conn.edge === EDGE.TOP) {
        conn.edge = EDGE.BOTTOM;
      } else if (conn.edge === EDGE.BOTTOM) {
        conn.edge = EDGE.TOP;
      }
    });
  }

  flipHorizontally() {
    this.data = this.data.map((row) => row.reverse());
    this.edges = [this.edges[0], this.edges[3], this.edges[2], this.edges[1]];
    this.connections.forEach((conn) => {
      if (conn.edge === EDGE.RIGHT) {
        conn.edge = EDGE.LEFT;
      } else if (conn.edge === EDGE.LEFT) {
        conn.edge = EDGE.RIGHT;
      }
    });
  }

  rotate() {
    this.data = this.data[0].map((_, index) => this.data.map((row) => row[index]).reverse());
    this.edges = [this.edges.pop(), ...this.edges];

    this.connections.forEach((conn) => (conn.edge = (conn.edge + 1) % 4));
  }
}

class Connection {
  constructor(edge, connectedEdge, tile) {
    this.edge = edge;
    this.tile = tile;
    this.connectedEdge = connectedEdge;
  }
}

const input = read(YEAR, DAY, { test: true });

function compare(edge1, edge2) {
  return edge1.join('') === edge2.join('');
}

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

tiles.forEach((tile1) => {
  tiles.forEach((tile2) => {
    if (tile2.id === tile1.id) return;

    let matched = false;

    for (const [i, edge1] of tile1.edges.entries()) {
      const e1F = edge1.join('');
      const e1R = edge1.reverse().join('');

      for (const [j, edge2] of tile2.edges.entries()) {
        const e2F = edge2.join('');
        const e2R = edge2.reverse().join('');

        if (e1F === e2F || e1F === e2R || e1R === e2F) {
          tile1.connections.push(new Connection(i, j, tile2));
          matched = true;
          break;
        }
      }

      if (matched) {
        break;
      }
    }
  });
});

const SIZE = Math.sqrt(tiles.length);
const grid = [...Array(SIZE)].map((_) => Array(SIZE).fill(null));

// Find a corner to start in top left
const corners = tiles.filter((tile) => tile.connections.length === 2);
let filtered;

do {
  filtered = corners.filter(
    (corner) =>
      corner.connections.filter((connection) => [EDGE.BOTTOM, EDGE.RIGHT].includes(connection.edge))
        .length === 2
  );

  if (filtered.length === 0) {
    corners.forEach((tile) => tile.rotate(1));
  }
} while (filtered.length === 0);

grid[0][0] = filtered[0].id;

for (let row = 0; row < SIZE; row++) {
  for (let col = 0; col < SIZE; col++) {
    if (row === 0 && col === 0) continue;

    const leftTileId = col > 0 ? grid[row][col - 1] : null;
    const aboveTileId = row > 0 ? grid[row - 1][col] : null;
    const expectedConnections = [];

    // if row > 0, there should be a top connection
    // if row < SIZE - 1, there should be a bottom connection
    // if col > 0, there should be a left connection
    // if col < SIZE - 1, there should be a right connection

    row > 0 && expectedConnections.push(EDGE.TOP);
    col < SIZE - 1 && expectedConnections.push(EDGE.RIGHT);
    row < SIZE - 1 && expectedConnections.push(EDGE.BOTTOM);
    col > 0 && expectedConnections.push(EDGE.LEFT);

    if (leftTileId) {
      const leftTile = tilesById.get(leftTileId);
      const tile = leftTile.connections.find((conn) => conn.edge === EDGE.RIGHT).tile;
      let actualConnections = tile.connections.map((conn) => conn.edge);
      let leftConnection = tile.connections.find(
        (conn) => conn.tile.id === leftTileId && conn.edge === EDGE.LEFT
      );

      let rotated = 0;
      let flippedH = false;
      let flippedV = false;

      while (
        !actualConnections.every((edge) => expectedConnections.includes(edge)) ||
        !leftConnection
      ) {
        if (rotated < 4) {
          tile.rotate();
          rotated++;
        } else if (!flippedH) {
          tile.flipHorizontally();
          rotated = 0;
          flippedH = true;
        } else if (!flippedV) {
          tile.flipHorizontally();
          tile.flipVertically();
          rotated = 0;
          flippedV = true;
        } else {
          tile.flipHorizontally();
          rotated = 0;
        }

        actualConnections = tile.connections.map((conn) => conn.edge);
        leftConnection = tile.connections.find(
          (conn) => conn.tile.id === leftTileId && conn.edge === EDGE.LEFT
        );
      }

      grid[row][col] = tile.id;
    } else if (aboveTileId) {
      const aboveTile = tilesById.get(aboveTileId);
      const tile = aboveTile.connections.find((conn) => conn.edge === EDGE.BOTTOM).tile;
      let actualConnections = tile.connections.map((conn) => conn.edge);
      let topConnection = tile.connections.find(
        (conn) => conn.tile.id === aboveTileId && conn.edge === EDGE.TOP
      );
      let rotated = 0;
      let flippedH = false;
      let flippedV = false;

      while (
        !actualConnections.every((edge) => expectedConnections.includes(edge)) ||
        !topConnection
      ) {
        if (rotated < 4) {
          tile.rotate();
          rotated++;
        } else if (!flippedH) {
          tile.flipHorizontally();
          rotated = 0;
          flippedH = true;
        } else if (!flippedV) {
          tile.flipHorizontally();
          tile.flipVertically();
          rotated = 0;
          flippedV = true;
        } else {
          tile.flipHorizontally();
          rotated = 0;
        }

        actualConnections = tile.connections.map((conn) => conn.edge);
        topConnection = tile.connections.find(
          (conn) => conn.tile.id === aboveTileId && conn.edge === EDGE.TOP
        );
      }

      grid[row][col] = tile.id;
    }
  }
}

tiles.forEach((tile) => tile.removeBorders());

const TILE_SIZE = tiles[0].data.length;
const IMAGE_SIZE = SIZE * TILE_SIZE;
const imageData = [...Array(IMAGE_SIZE)].map((_) => Array(IMAGE_SIZE).fill(null));

for (let row = 0; row < SIZE; row++) {
  for (let col = 0; col < SIZE; col++) {
    const tile = tilesById.get(grid[row][col]);

    for (let tileDataRow = 0; tileDataRow < tile.data.length; tileDataRow++) {
      for (let tileDataCol = 0; tileDataCol < tile.data[0].length; tileDataCol++) {
        imageData[row * TILE_SIZE + tileDataRow][col * TILE_SIZE + tileDataCol] =
          tile.data[tileDataRow][tileDataCol];
      }
    }
  }
}

const image = new Tile(null, imageData);

image.flipVertically();
image.print();

write(YEAR, DAY, PART, '');
