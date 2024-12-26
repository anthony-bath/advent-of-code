export function part1({ lines }) {
  const fabric = [...Array(1000).keys()].map((_) => Array(1000).fill('.'));

  lines.forEach((line) => {
    const [_, x, y, w, h] = line.match(/\d+/g).map((n) => Number(n));

    for (let row = y; row < y + h; row++) {
      for (let col = x; col < x + w; col++) {
        if (fabric[row][col] === '.') {
          fabric[row][col] = '#';
        } else {
          fabric[row][col] = 'X';
        }
      }
    }
  });

  return fabric.reduce((count, row) => count + row.filter((square) => square === 'X').length, 0);
}
