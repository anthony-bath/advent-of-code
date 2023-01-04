import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 20, 1];

class Tile {
  constructor(id, data) {
    this.id = id;
    this.data = data;

    this.edges = [
      data[0],
      data[data.length - 1],
      data.reduce((edge, _, i) => [...edge, data[i][0]], []),
      data.reduce((edge, _, i) => [...edge, data[i][data.length - 1]], []),
    ];
  }
}

const input = read(YEAR, DAY);
const tiles = [];

for (let i = 0; i < input.length; i += 12) {
  const id = Number(input[i].match(/\d+/));
  const data = [];

  for (let j = i + 1; j < i + 11; j++) {
    data.push(input[j].split(''));
  }

  tiles.push(new Tile(id, data));
}

const corners = [];

tiles.forEach((tile1) => {
  const tileMatches = new Set();

  tiles.forEach((tile2) => {
    if (tile2.id === tile1.id) return;

    let matched = false;

    for (const edge1 of tile1.edges) {
      const e1F = edge1.join('');
      const e1R = edge1.reverse().join('');

      for (const edge2 of tile2.edges) {
        const e2F = edge2.join('');
        const e2R = edge2.reverse().join('');

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

  if (tileMatches.size === 2) {
    corners.push(tile1.id);
  }
});

write(
  YEAR,
  DAY,
  PART,
  corners.reduce((product, id) => product * id, 1)
);
