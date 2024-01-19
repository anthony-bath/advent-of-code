export function getInputElements(lines) {
  let algo = [];
  const image = [];

  lines.forEach((line, i) => {
    if (i === 0) {
      algo = line.trim().split('');
    } else if (i > 1) {
      image.push(line.trim().split(''));
    }
  });

  return { algo, image };
}

export function enhance(image, algo, step) {
  const infinity = step % 2 ? '#' : '.';
  const bit = infinity === '#' ? '1' : '0';

  const base = [
    Array(image[0].length + 2).fill(infinity),
    ...image.map((row) => [infinity, ...row, infinity]),
    Array(image[0].length + 2).fill(infinity),
  ];

  const enhanced = base.map((row) => [...row]);

  const ROWS = enhanced.length;
  const COLS = enhanced[0].length;

  let lit = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const bits = [
        row > 0 && col > 0 ? getBit(base, row - 1, col - 1) : bit,
        row > 0 ? getBit(base, row - 1, col) : bit,
        row > 0 && col < COLS - 1 ? getBit(base, row - 1, col + 1) : bit,
        col > 0 ? (base[row][col - 1] === '#' ? '1' : '0') : bit,
        getBit(base, row, col),
        col < COLS - 1 ? getBit(base, row, col + 1) : bit,
        row < ROWS - 1 && col > 0 ? getBit(base, row + 1, col - 1) : bit,
        row < ROWS - 1 ? getBit(base, row + 1, col) : bit,
        row < ROWS - 1 && col < COLS - 1 ? getBit(base, row + 1, col + 1) : bit,
      ];

      const algoIndex = parseInt(bits.join(''), 2);
      enhanced[row][col] = algo[algoIndex];
      lit += algo[algoIndex] === '#' ? 1 : 0;
    }
  }

  return { enhanced, lit };
}

function getBit(image, row, col) {
  return image[row][col] === '#' ? '1' : '0';
}
