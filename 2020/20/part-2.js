import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 20, 2];

class Tile {
  constructor(id, data) {
    this.id = id;
    this.data = data;

    // Original orientation edges
    this.edges = [
      data[0], // Top
      data[data.length - 1], // Bottom
      data.reduce((edge, _, i) => [...edge, data[i][0]], []), // Left
      data.reduce((edge, _, i) => [...edge, data[i][data.length - 1]], []), // Right
    ];

    this.connections = [];
  }

  print() {
    console.log(this.data.map((row) => row.join('')).join('\n'));
  }

  flipVertically() {
    this.data = this.data.reduce(
      (flipped, row, index) => [...flipped, this.data[this.data.length - 1 - index]],
      []
    );
  }

  flipHorizontally() {
    this.data = this.data.map((row) => row.reverse());
  }
}

class Connection {
  constructor(edgeIndex, edgeReversed, connectedTile, connectedEdgeIndex, connectedEdgeReversed) {
    this.edgeIndex = edgeIndex;
    this.edgeReversed = edgeReversed;
    this.connectedTile = connectedTile;
    this.connectedEdgeIndex = connectedEdgeIndex;
    this.connectedEdgeReversed = connectedEdgeReversed;
  }
}

const input = read(YEAR, DAY, { test: true });
const tiles = [];

for (let i = 0; i < input.length; i += 12) {
  const id = Number(input[i].match(/\d+/));
  const data = [];

  for (let j = i + 1; j < i + 11; j++) {
    data.push(input[j].split(''));
  }

  tiles.push(new Tile(id, data));
}

const matches = new Map();
const connections = [];

tiles
  .filter((tile) => [2311, 3079].includes(tile.id))
  .forEach((tile1) => {
    const tileMatches = new Set();

    tiles
      .filter((tile) => [2311, 3079].includes(tile.id))
      .forEach((tile2) => {
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

tiles
  .filter((tile) => [2311, 3079].includes(tile.id))
  .forEach((tile) => console.log(tile.connections));

write(YEAR, DAY, PART, '');
