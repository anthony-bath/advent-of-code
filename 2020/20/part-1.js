export function part1({ lines }) {
  const tiles = [];

  for (let i = 0; i < lines.length; i += 12) {
    const id = Number(lines[i].match(/\d+/));
    const data = [];

    for (let j = i + 1; j < i + 11; j++) {
      data.push(lines[j].split(''));
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
        for (const edge2 of tile2.edges) {
          if (edge1 === edge2) {
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

  return corners.reduce((product, id) => product * id, 1);
}

class Tile {
  constructor(id, data) {
    this.id = id;
    this.data = data;

    this.edges = [
      data[0].join(''),
      data[data.length - 1].join(''),
      data.reduce((edge, _, i) => [...edge, data[i][0]], []).join(''),
      data.reduce((edge, _, i) => [...edge, data[i][data.length - 1]], []).join(''),
      [...data[0]].reverse().join(''),
      [...data[data.length - 1]].reverse().join(''),
      [...data.reduce((edge, _, i) => [...edge, data[i][0]], [])].reverse().join(''),
      [...data.reduce((edge, _, i) => [...edge, data[i][data.length - 1]], [])].reverse().join(''),
    ];
  }
}
