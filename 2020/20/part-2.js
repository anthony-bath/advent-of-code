import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 20, 2];

const EDGE = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
};

class Tile {
  constructor(data, id) {
    this.id = id;
    this.data = data;
    this.edges = [this.topEdge(), this.rightEdge(), this.bottomEdge(), this.leftEdge()];
    this.connections = [];
    this.rotations = 0;
  }

  nextOrientation() {
    if (this.rotations < 3) {
      this.rotate();
      this.rotations++;
    } else {
      this.flip();
      this.rotations = 0;
    }
  }

  removeBorders() {
    this.data = this.data.reduce((borderless, row, index) => {
      if (index === 0 || index === this.data.length - 1) return borderless;
      return [...borderless, row.slice(1, row.length - 1)];
    }, []);
  }

  flip() {
    this.data = this.data.map((row) => row.reverse());

    this.connections.forEach((conn) => {
      if (conn.edge === EDGE.RIGHT) {
        conn.edge = EDGE.LEFT;
      } else if (conn.edge === EDGE.LEFT) {
        conn.edge = EDGE.RIGHT;
      }
    });
  }

  rotate() {
    this.data = this.data[0].map((_, index) => [...this.data.map((row) => row[index])].reverse());
    this.connections.forEach((conn) => (conn.edge = (conn.edge + 1) % 4));
  }

  leftEdge() {
    return this.data.reduce((edge, _, i) => [...edge, this.data[i][0]], []);
  }

  topEdge() {
    return this.data[0];
  }

  rightEdge() {
    return this.data.reduce((edge, _, i) => [...edge, this.data[i][this.data.length - 1]], []);
  }

  bottomEdge() {
    return this.data[this.data.length - 1];
  }
}

class Connection {
  constructor(edge, tile) {
    this.edge = edge;
    this.tile = tile;
  }
}

function compare(edge1, edge2) {
  return edge1.join('') === edge2.join('');
}

const input = read(YEAR, DAY);
const tilesById = new Map();

// Create Tiles
for (let i = 0; i < input.length; i += 12) {
  const id = Number(input[i].match(/\d+/));
  const data = [];

  for (let j = i + 1; j < i + 11; j++) {
    data.push(input[j].split(''));
  }

  tilesById.set(id, new Tile(data, id));
}

const tiles = [...tilesById.values()];

// Set Tile Connections
tiles.forEach((tile1) => {
  tiles.forEach((tile2) => {
    if (tile2.id === tile1.id) return;

    let matched = false;

    for (const [i, edge1] of tile1.edges.entries()) {
      const e1F = edge1.join('');
      const e1R = [...edge1].reverse().join('');

      for (const edge2 of tile2.edges) {
        const e2F = edge2.join('');
        const e2R = [...edge2].reverse().join('');

        if (e1F === e2F || e1F === e2R || e1R === e2F) {
          tile1.connections.push(new Connection(i, tile2));
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

// Find a corner to start in top left
const corners = tiles.filter((tile) => tile.connections.length === 2);
let corner;

do {
  corner = corners.find(
    (corner) =>
      corner.connections.filter((connection) => [EDGE.BOTTOM, EDGE.RIGHT].includes(connection.edge))
        .length === 2
  );

  if (!corner) {
    corners.forEach((tile) => tile.rotate());
  }
} while (!corner);

// Build the grid of Tile Ids correctly positioned and orientated
const SIZE = Math.sqrt(tiles.length);
const grid = [...Array(SIZE)].map((_) => Array(SIZE).fill(null));

grid[0][0] = corner.id;

for (let row = 0; row < SIZE; row++) {
  for (let col = 0; col < SIZE; col++) {
    if (row === 0 && col === 0) continue;

    const leftTile = col > 0 ? tilesById.get(grid[row][col - 1]) : null;
    const aboveTile = row > 0 ? tilesById.get(grid[row - 1][col]) : null;
    let tile;

    if (leftTile) {
      tile = leftTile.connections.find((conn) => conn.edge === EDGE.RIGHT).tile;

      while (!compare(tile.leftEdge(), leftTile.rightEdge())) {
        tile.nextOrientation();
      }
    } else if (aboveTile) {
      tile = aboveTile.connections.find((conn) => conn.edge === EDGE.BOTTOM).tile;

      while (!compare(tile.topEdge(), aboveTile.bottomEdge())) {
        tile.nextOrientation();
      }
    }

    grid[row][col] = tile.id;
  }
}

// Create the joined image with borderless tiles
tiles.forEach((tile) => tile.removeBorders());

const TILE_SIZE = tiles[0].data.length;
const IMAGE_SIZE = SIZE * TILE_SIZE;
const imageData = [...Array(IMAGE_SIZE)].map((_) => Array(IMAGE_SIZE).fill('K'));

for (let row = 0; row < SIZE; row++) {
  for (let col = 0; col < SIZE; col++) {
    const tile = tilesById.get(grid[row][col]);

    for (let tileRow = 0; tileRow < tile.data.length; tileRow++) {
      for (let tileCol = 0; tileCol < tile.data[0].length; tileCol++) {
        imageData[row * TILE_SIZE + tileRow][col * TILE_SIZE + tileCol] =
          tile.data[tileRow][tileCol];
      }
    }
  }
}

const image = new Tile(imageData);

// Search for the Sea Monsters
const MONSTER_LENGTH = 20;
const HEAD_POS = 18;
const MONSTER_SIZE = 15;

const midExpr = /#....##....##....###/;
const botExpr = /.#..#..#..#..#..#.../;

let found = false;
let count = 0;

while (true) {
  for (let row = 1; row < image.data.length - 1; row++) {
    for (let i = 0; i < image.data[row].length - MONSTER_LENGTH; i++) {
      const top = image.data[row - 1][i + HEAD_POS] === '#';
      const mid = image.data[row].slice(i, i + MONSTER_LENGTH).join('');
      const bot = image.data[row + 1].slice(i, i + MONSTER_LENGTH).join('');

      if (top && midExpr.test(mid) && botExpr.test(bot)) {
        found = true;
        count++;
      }
    }
  }

  if (found) {
    break;
  } else {
    image.nextOrientation();
  }
}

const pixels = image.data.reduce((count, row) => count + row.filter((p) => p === '#').length, 0);
const result = pixels - count * MONSTER_SIZE;

write(YEAR, DAY, PART, result);
