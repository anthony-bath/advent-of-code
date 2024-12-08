const { max } = Math;

export function part2({ lines }) {
  const grid = Array(1000)
    .fill()
    .map(() => Array(1000).fill(0));

  lines.forEach((line) => {
    const [x1, y1, x2, y2] = line.match(/\d+/g).map(Number);

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        if (line.startsWith('turn on')) {
          grid[y][x]++;
        } else if (line.startsWith('turn off')) {
          grid[y][x] = max(0, grid[y][x] - 1);
        } else {
          grid[y][x] += 2;
        }
      }
    }
  });

  let brightness = 0;

  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      brightness += grid[y][x];
    }
  }

  return brightness;
}
