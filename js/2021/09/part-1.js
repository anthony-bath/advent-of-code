export function part1({ lines }) {
  const grid = lines.map((line) => line.trim().split('').map(Number));

  let riskLevel = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let u = i > 0 ? grid[i - 1][j] : 10;
      let d = i < grid.length - 1 ? grid[i + 1][j] : 10;
      let l = j > 0 ? grid[i][j - 1] : 10;
      let r = j < grid[i].length - 1 ? grid[i][j + 1] : 10;

      const point = grid[i][j];

      if ([u, d, l, r].every((x) => x > point)) {
        riskLevel += 1 + point;
      }
    }
  }

  return riskLevel;
}
